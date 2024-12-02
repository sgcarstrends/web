import { Suspense } from "react";
import { fetchMonths } from "@/app/(dashboard)/cars/utils/fetchMonths";
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
import { fetchApi } from "@/utils/fetchApi";
import { mergeCarsByMake } from "@/utils/mergeCarsByMake";
import { deslugify, slugify } from "@/utils/slugify";
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

  const formattedFuelType = deslugify(fuelType);
  const title = `${formattedFuelType} Cars in Singapore`;
  const description = `Explore registration trends and statistics for ${formattedFuelType} cars in Singapore.`;
  // const images = `/api/og?type=${fuelType}&month=${month}`;
  const pageUrl = `/cars/fuel-types/${fuelType}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      title,
      description,
      images: "/opengraph-image.png",
      url: pageUrl,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: "/opengraph-image.png",
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical: pageUrl,
    },
  };
};

const fuelTypes = ["petrol", "hybrid", "electric", "diesel"];

export const generateStaticParams = () =>
  fuelTypes.map((fuelType) => ({ fuelType: slugify(fuelType) }));

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

  const formattedFuelType = deslugify(fuelType);
  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${formattedFuelType} Car in Singapore`,
    description: `Explore registration trends and statistics for ${formattedFuelType} cars in Singapore.`,
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
    <>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-2 xl:flex-row">
          <div className="flex items-start">
            <Typography.H1>{deslugify(fuelType).toUpperCase()}</Typography.H1>
          </div>
          <div className="items-end">
            <Suspense fallback={null}>
              <MonthSelector months={months} />
            </Suspense>
          </div>
        </div>
        <CarOverviewTrends cars={filteredCars} />
      </div>
    </>
  );
};

export default CarsByFuelTypePage;
