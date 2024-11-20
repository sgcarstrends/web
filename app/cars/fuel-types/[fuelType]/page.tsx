import { Suspense } from "react";
import { fetchMonths } from "@/app/cars/utils/fetchMonths";
import { CarOverviewTrends } from "@/app/components/CarOverviewTrends";
import { EmptyData } from "@/components/EmptyData";
import { MonthSelector } from "@/components/MonthSelector";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { API_URL, SITE_TITLE, SITE_URL } from "@/config";
import {
  type Car,
  type LatestMonth,
  type Month,
  RevalidateTags,
} from "@/types";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { fetchApi } from "@/utils/fetchApi";
import { mergeCarsByMake } from "@/utils/mergeCarsByMake";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

type Params = Promise<{ fuelType: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const generateMetadata = async (props: {
  params: Params;
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { fuelType } = params;
  let month = searchParams?.month;

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`${API_URL}/months/latest`);
    month = latestMonth.cars;
  }

  const title = `${capitaliseWords(fuelType)} Cars in Singapore`;
  const description = `Explore registration trends and statistics for ${fuelType} cars in Singapore.`;
  const images = `${SITE_URL}/api/og?type=${fuelType}&month=${month}`;
  const pageUrl = `/cars/fuel-types/${fuelType}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images,
      url: pageUrl,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      title,
      description,
      images,
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical: pageUrl,
    },
  };
};

const fuelTypes = ["petrol", "hybrid", "electric", "diesel"];

export const generateStaticParams = () =>
  fuelTypes.map((fuelType) => ({ fuelType }));

const CarsByFuelTypePage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { fuelType } = params;

  const [months, latestMonth]: [Month[], LatestMonth] = await fetchMonths();

  const month = searchParams?.month ?? latestMonth.cars;
  const cars = await fetchApi<Car[]>(
    `${API_URL}/cars?fuel_type=${fuelType}&month=${month}`,
    { next: { tags: [RevalidateTags.Cars] } },
  );

  if (cars.length === 0) {
    return <EmptyData />;
  }

  const filteredCars = mergeCarsByMake(cars);

  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${capitaliseWords(fuelType)} Car in Singapore`,
    description: `Explore registration trends and statistics for ${fuelType} cars in Singapore.`,
    url: `${SITE_URL}/cars/fuel-types/${fuelType}`,
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE_TITLE,
      url: SITE_URL,
    },
  };

  return (
    <section>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="flex items-end gap-2">
            <Typography.H1 className="uppercase">
              {capitaliseWords(fuelType)}
            </Typography.H1>
          </div>
          <div className="lg:justify-self-end">
            <Suspense fallback={null}>
              <MonthSelector months={months} />
            </Suspense>
          </div>
        </div>
        <CarOverviewTrends cars={filteredCars} />
      </div>
    </section>
  );
};

export default CarsByFuelTypePage;
