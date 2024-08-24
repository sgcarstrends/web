import Link from "next/link";
import { CarTreeMap } from "@/components/CarTreeMap";
import { DataTable } from "@/components/DataTable";
import { MonthSelector } from "@/components/MonthSelector";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL, EXCLUSION_LIST, SITE_TITLE, SITE_URL } from "@/config";
import { type Car, type LatestMonth, RevalidateTags } from "@/types";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  params: { type: string };
  searchParams?: { [key: string]: string };
}

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { type } = params;
  let month = searchParams?.month;

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`${API_URL}/months/latest`);
    month = latestMonth.cars;
  }
  const images = `${SITE_URL}/api/og?type=${type}&month=${month}`;
  const pageUrl = `/cars/${type}`;

  return {
    title: capitaliseWords(type),
    description: `${capitaliseWords(type)} car registrations for the month of ${formatDateToMonthYear(month)}`,
    openGraph: {
      images,
      url: pageUrl,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: { images, creator: "@sgcarstrends" },
    alternates: {
      canonical: pageUrl,
    },
  };
};

const tabItems: Record<string, string> = {
  petrol: "/cars/petrol",
  hybrid: "/cars/hybrid",
  electric: "/cars/electric",
  diesel: "/cars/diesel",
};

export const generateStaticParams = () =>
  Object.keys(tabItems).map((key) => ({
    type: key,
  }));

const CarsByFuelTypePage = async ({ params, searchParams }: Props) => {
  const { type } = params;

  const [months, latestMonth] = await Promise.all([
    fetchApi<string[]>(`${API_URL}/months`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
    fetchApi<LatestMonth>(`${API_URL}/months/latest`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
  ]);

  const month = searchParams?.month ?? latestMonth.cars;
  const cars = await fetchApi<Car[]>(`${API_URL}/cars/${type}?month=${month}`, {
    next: { tags: [RevalidateTags.Cars] },
  });

  const totals = new Map();
  cars.forEach(({ make, number }) => {
    if (totals.has(make)) {
      totals.set(make, (totals.get(make) || 0) + number);
    } else {
      totals.set(make, number);
    }
  });

  const filteredCars = cars.filter(
    ({ make, number }) => !EXCLUSION_LIST.includes(make) && number > 0,
  );

  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: capitaliseWords(type),
    url: `${SITE_URL}/cars/${type}`,
  };

  return (
    <section>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-y-8">
        <UnreleasedFeature>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/cars">Cars</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{capitaliseWords(type)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </UnreleasedFeature>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-end gap-x-2">
            <Typography.H1 className="uppercase">
              {capitaliseWords(type)}
            </Typography.H1>
          </div>
          <MonthSelector months={months} />
        </div>
        <Tabs defaultValue={type}>
          <TabsList>
            {Object.entries(tabItems).map(([title, href]) => {
              return (
                <Link key={title} href={href}>
                  <TabsTrigger value={title}>
                    {capitaliseWords(title)}
                  </TabsTrigger>
                </Link>
              );
            })}
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <CarTreeMap data={filteredCars} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={filteredCars} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CarsByFuelTypePage;
