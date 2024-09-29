import { Suspense } from "react";
import Link from "next/link";
import { CarOverviewTrends } from "@/app/components/CarOverviewTrends";
import { LinkWithParams } from "@/components/LinkWithParams";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL, SITE_TITLE, SITE_URL } from "@/config";
import { type Car, type LatestMonth, RevalidateTags } from "@/types";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { fetchApi } from "@/utils/fetchApi";
import { mergeCarsByFuelType } from "@/utils/mergeCarsByFuelType";
import type { Metadata } from "next";
import type { Dataset, WithContext } from "schema-dts";

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
    description: `Car registration trends for ${type} fuel type`,
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
  const cars = await fetchApi<Car[]>(
    `${API_URL}/cars?fuel_type=${type}&month=${month}`,
    {
      next: { tags: [RevalidateTags.Cars] },
    },
  );
  const filteredCars = mergeCarsByFuelType(cars);

  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${capitaliseWords(type)} Car Registrations in Singapore`,
    description: `Overview and registration statistics for ${type} cars in Singapore by make`,
    url: `${SITE_URL}/cars/${type}`,
    creator: {
      "@type": "Organization",
      name: SITE_TITLE,
    },
    // TODO: For future use
    // distribution: [
    //   {
    //     "@type": "DataDownload",
    //     encodingFormat: "image/png",
    //     contentUrl: `${SITE_URL}/images/${type}-car-stats.png`,
    //   },
    // ],
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
          <Suspense fallback={null}>
            <MonthSelector months={months} />
          </Suspense>
        </div>
        <Tabs defaultValue={type}>
          <TabsList>
            {Object.entries(tabItems).map(([title, href]) => (
              <LinkWithParams key={title} href={href}>
                <TabsTrigger value={title}>
                  {capitaliseWords(title)}
                </TabsTrigger>
              </LinkWithParams>
            ))}
          </TabsList>
        </Tabs>
        <CarOverviewTrends cars={filteredCars} />
      </div>
    </section>
  );
};

export default CarsByFuelTypePage;
