import slugify from "@sindresorhus/slugify";
import { columns } from "@/app/cars/makes/[make]/columns";
import { loadSearchParams } from "@/app/cars/makes/[make]/search-params";
import { TrendChart } from "@/app/cars/makes/[make]/trend-chart";
import { MakeSelector } from "@/components/make-selector";
import NoData from "@/components/no-data";
import { PageHeader } from "@/components/page-header";
import { StructuredData } from "@/components/structured-data";
import Typography from "@/components/typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { API_URL, LAST_UPDATED_CARS_KEY, SITE_TITLE, SITE_URL } from "@/config";
import redis from "@/config/redis";
import { type Car, type LatestMonth, type Make, type Month, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetch-api";
import { fetchMonthsForCars, getMonthOrLatest } from "@/utils/month-utils";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  params: Promise<{ make: string }>;
  searchParams: Promise<SearchParams>;
}

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { make } = await params;
  let { month } = await loadSearchParams(searchParams);

  month = await getMonthOrLatest(month, "cars");

  const cars = await fetchApi<{ make: string; total: number; data: Car[] }>(
    `${API_URL}/cars/makes/${make}?month=${month}`,
  );

  const title = `${cars.make} Cars Overview: Registration Trends`;
  const description = `${cars.make} cars overview. Historical car registration trends and monthly breakdown by fuel and vehicle types in Singapore.`;

  const images = `/api/og?title=${make.toUpperCase()}&subtitle=Stats by Make&month=${month}&total=${cars.total}`;
  const canonical = `/cars/makes/${make}?month=${month}`;

  return {
    title,
    description,
    openGraph: {
      images,
      url: canonical,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images,
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical,
    },
  };
};

export const generateStaticParams = async () => {
  const makes = await fetchApi<Make[]>(`${API_URL}/cars/makes`);
  return makes.map((make) => ({ make: slugify(make) }));
};

const CarMakePage = async ({ params }: Props) => {
  const { make } = await params;

  const [cars, makes, months]: [{ make: string; total: number; data: Car[] }, Make[], Month[]] =
    await Promise.all([
      fetchApi<{ make: string; total: number; data: Car[] }>(
        `${API_URL}/cars/makes/${slugify(make)}`,
      ),
      fetchApi<Make[]>(`${API_URL}/cars/makes`),
      fetchMonthsForCars(),
    ]);
  const lastUpdated = await redis.get<number>(LAST_UPDATED_CARS_KEY);

  const title = `${cars.make} Cars Overview: Registration Trends`;
  const description = `${cars.make} cars overview. Historical car registration trends and monthly breakdown by fuel and vehicle types in Singapore.`;
  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}/cars/makes/${make}`,
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
    },
  };

  if (!cars) {
    return <NoData />;
  }

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-4">
        <PageHeader
          title={cars.make}
          lastUpdated={lastUpdated}
          months={months}
          showMonthSelector={true}
        >
          <MakeSelector makes={makes} selectedMake={make} />
        </PageHeader>
        <Card>
          <CardHeader>
            <CardTitle>Historical Trend</CardTitle>
            <CardDescription>Past registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <TrendChart data={cars.data.toReversed()} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              Breakdown of fuel &amp; vehicle types by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={cars.data} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CarMakePage;
