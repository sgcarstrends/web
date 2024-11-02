import { Suspense } from "react";
import { CarOverviewTrends } from "@/app/components/CarOverviewTrends";
import { EmptyData } from "@/components/EmptyData";
import { LinkWithParams } from "@/components/LinkWithParams";
import { MonthSelector } from "@/components/MonthSelector";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL, SITE_TITLE, SITE_URL } from "@/config";
import {
  type Car,
  type LatestMonth,
  type Month,
  RevalidateTags,
} from "@/types";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { fetchApi } from "@/utils/fetchApi";
import { mergeCarsByVehicleType } from "@/utils/mergeCarsByVehicleType";
import type { Metadata } from "next";
import type { Dataset, WithContext } from "schema-dts";

interface Props {
  params: { vehicleType: string };
  searchParams?: { [key: string]: string };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  let { vehicleType } = params;
  vehicleType = decodeURIComponent(vehicleType);
  const description = `${capitaliseWords(vehicleType)} historical trends`;
  const images = `/api/og?title=Historical Trend&type=${vehicleType}`;
  const canonicalUrl = `/cars/vehicle-type/${vehicleType}`;

  return {
    title: capitaliseWords(vehicleType),
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
  hatchback: "/cars/vehicle-type/hatchback",
  sedan: "/cars/vehicle-type/sedan",
  "multi-purpose vehicle": "/cars/vehicle-type/multi-purpose vehicle",
  "station-wagon": "/cars/vehicle-type/station-wagon",
  "sports utility vehicle": "/cars/vehicle-type/sports utility vehicle",
  "coupe/convertible": "/cars/vehicle-type/coupe%2Fconvertible",
};

export const generateStaticParams = () =>
  Object.keys(tabItems).map((vehicleType) => ({ vehicleType }));

const CarsByVehicleTypePage = async ({ params, searchParams }: Props) => {
  const { vehicleType } = params;

  const [months, latestMonth]: [Month[], LatestMonth] = await Promise.all([
    await fetchApi<Month[]>(`${API_URL}/cars/months`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
    await fetchApi<LatestMonth>(`${API_URL}/months/latest`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
  ]);

  const month = searchParams?.month ?? latestMonth.cars;
  const cars = await fetchApi<Car[]>(
    `${API_URL}/cars?vehicle_type=${vehicleType}&month=${month}`,
    { next: { tags: [RevalidateTags.Cars] } },
  );

  if (cars.length === 0) {
    return <EmptyData />;
  }

  const filteredCars = mergeCarsByVehicleType(cars);

  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${capitaliseWords(vehicleType)} Car Registrations in Singapore`,
    description: `Overview and registration statistics for ${vehicleType} cars in Singapore by vehicle type`,
    url: `${SITE_URL}/cars/vehicle-type/${vehicleType}`,
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
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-end gap-x-2">
            <Typography.H1 className="uppercase">
              {capitaliseWords(decodeURIComponent(vehicleType))}
            </Typography.H1>
          </div>
          <Suspense fallback={null}>
            <MonthSelector months={months} />
          </Suspense>
        </div>
        <Tabs defaultValue={decodeURIComponent(vehicleType)}>
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
        <CarOverviewTrends cars={filteredCars} />
      </div>
    </section>
  );
};

export default CarsByVehicleTypePage;
