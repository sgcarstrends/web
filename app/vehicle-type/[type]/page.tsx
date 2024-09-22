import { Suspense } from "react";
import Link from "next/link";
import { TrendChart } from "@/app/cars/[type]/TrendChart";
import { DataTable } from "@/components/DataTable";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL, SITE_TITLE, SITE_URL } from "@/config";
import { type Car, type LatestMonth, RevalidateTags } from "@/types";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { fetchApi } from "@/utils/fetchApi";
import { mergeCarsByVehicleType } from "@/utils/mergeCarsByVehicleType";
import type { Metadata } from "next";
import type { Dataset, WithContext } from "schema-dts";

interface Props {
  params: { type: string };
  searchParams?: { [key: string]: string };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  let { type } = params;
  type = decodeURIComponent(type);
  const description = `${capitaliseWords(type)} historical trends`;
  const images = `/api/og?title=Historical Trend&type=${type}`;
  const canonicalUrl = `/vehicle-type/${type}`;

  return {
    title: capitaliseWords(type),
    description,
    openGraph: {
      images,
      url: canonicalUrl,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      images,
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

const tabItems: Record<string, string> = {
  hatchback: "/vehicle-type/hatchback",
  sedan: "/vehicle-type/sedan",
  "multi-purpose vehicle": "/vehicle-type/multi-purpose vehicle",
  "station-wagon": "/vehicle-type/station-wagon",
  "sports utility vehicle": "/vehicle-type/sports utility vehicle",
  "coupe/convertible": "/vehicle-type/coupe%2Fconvertible",
};

export const generateStaticParams = () =>
  Object.keys(tabItems).map((key) => ({ type: key }));

const CarsByVehicleTypePage = async ({ params, searchParams }: Props) => {
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
    `${API_URL}/cars?vehicle_type=${type}&month=${month}`,
    {
      next: { tags: [RevalidateTags.Cars] },
    },
  );

  const filteredCars = mergeCarsByVehicleType(cars);

  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${capitaliseWords(type)} Car Registrations in Singapore`,
    description: `Overview and registration statistics for ${type} cars in Singapore by vehicle type`,
    url: `${SITE_URL}/cars/${type}`,
    creator: {
      "@type": "Organization",
      name: SITE_TITLE,
    },
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Make",
        description: "Car manufacturer",
      },
      {
        "@type": "PropertyValue",
        name: "Count",
        description: `Number of ${type} car registrations`,
      },
      {
        "@type": "PropertyValue",
        name: "Market Share by Type",
        description: `Percentage market share of ${type} car registrations by type`,
      },
    ],
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
                <BreadcrumbPage>
                  {capitaliseWords(decodeURIComponent(type))}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </UnreleasedFeature>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-end gap-x-2">
            <Typography.H1 className="uppercase">
              {capitaliseWords(decodeURIComponent(type))}
            </Typography.H1>
          </div>
          <Suspense fallback={null}>
            <MonthSelector months={months} />
          </Suspense>
        </div>
        <Tabs defaultValue={decodeURIComponent(type)}>
          <ScrollArea>
            <TabsList>
              {Object.entries(tabItems).map(([title, href]) => {
                return (
                  <LinkWithParams key={title} href={href}>
                    <TabsTrigger value={title}>
                      {capitaliseWords(title)}
                    </TabsTrigger>
                  </LinkWithParams>
                );
              })}
            </TabsList>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={null}>
                <TrendChart data={filteredCars} />
              </Suspense>
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

export default CarsByVehicleTypePage;
