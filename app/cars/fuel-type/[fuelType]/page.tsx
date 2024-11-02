import { Suspense } from "react";
import { CarOverviewTrends } from "@/app/components/CarOverviewTrends";
import { EmptyData } from "@/components/EmptyData";
import { LinkWithParams } from "@/components/LinkWithParams";
import { MonthSelector } from "@/components/MonthSelector";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
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
import { mergeCarsByFuelType } from "@/utils/mergeCarsByFuelType";
import type { Metadata } from "next";
import type { Dataset, WithContext } from "schema-dts";

interface Props {
  params: { fuelType: string };
  searchParams?: { [key: string]: string };
}

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { fuelType } = params;
  let month = searchParams?.month;

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`${API_URL}/months/latest`);
    month = latestMonth.cars;
  }
  const images = `${SITE_URL}/api/og?type=${fuelType}&month=${month}`;
  const pageUrl = `/cars/fuel-type/${fuelType}`;

  return {
    title: capitaliseWords(fuelType),
    description: `Car registration trends for ${fuelType} fuel type`,
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
  petrol: "/cars/fuel-type/petrol",
  hybrid: "/cars/fuel-type/hybrid",
  electric: "/cars/fuel-type/electric",
  diesel: "/cars/fuel-type/diesel",
};

export const generateStaticParams = () =>
  Object.keys(tabItems).map((fuelType) => ({ fuelType }));

const CarsByFuelTypePage = async ({ params, searchParams }: Props) => {
  const { fuelType } = params;

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
    `${API_URL}/cars?fuel_type=${fuelType}&month=${month}`,
    {
      next: { tags: [RevalidateTags.Cars] },
    },
  );

  if (cars.length === 0) {
    return <EmptyData />;
  }

  const filteredCars = mergeCarsByFuelType(cars);

  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${capitaliseWords(fuelType)} Car Registrations in Singapore`,
    description: `Overview and registration statistics for ${fuelType} cars in Singapore by make`,
    url: `${SITE_URL}/cars/fuel-type/${fuelType}`,
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
              {capitaliseWords(fuelType)}
            </Typography.H1>
          </div>
          <Suspense fallback={null}>
            <MonthSelector months={months} />
          </Suspense>
        </div>
        <Tabs defaultValue={fuelType}>
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
