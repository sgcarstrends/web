import dynamic from "next/dynamic";
import { loadSearchParams } from "@/app/cars/fuel-types/[fuelType]/search-params";
import { fetchMonths } from "@/app/cars/utils/fetchMonths";
import NoData from "@/components/NoData";
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
import type { SearchParams } from "nuqs/server";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  params: Promise<{ fuelType: string }>;
  searchParams: Promise<SearchParams>;
}

const CarOverviewTrends = dynamic(
  () => import("@/app/components/CarOverviewTrends"),
);
const MonthSelector = dynamic(() => import("@/components/MonthSelector"));

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { fuelType } = await params;
  const { month } = await loadSearchParams(searchParams);

  const formattedFuelType = deslugify(fuelType);
  const title = `${formattedFuelType} Cars in Singapore`;
  const description = `${formattedFuelType} cars registrations by month. Explore registration trends, statistics and distribution by fuel type for the month in Singapore.`;
  const canonical = `/cars/fuel-types/${fuelType}?month=${month}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: `${SITE_URL}/opengraph-image.png`,
      url: canonical,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: `${SITE_URL}/twitter-image.png`,
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical,
    },
  };
};

const fuelTypes = ["petrol", "hybrid", "electric", "diesel"];

export const generateStaticParams = () =>
  fuelTypes.map((fuelType) => ({ fuelType: slugify(fuelType) }));

const CarsByFuelTypePage = async ({ params, searchParams }: Props) => {
  const { fuelType } = await params;
  const { month } = await loadSearchParams(searchParams);

  const [months]: [Month[], LatestMonth] = await fetchMonths();

  const queries = {
    fuel_type: fuelType,
    ...(month && { month }),
  };
  const search = new URLSearchParams(queries);

  const cars = await fetchApi<Car[]>(`${API_URL}/cars?${search.toString()}`, {
    next: { tags: [RevalidateTags.Cars] },
  });

  const filteredCars = mergeCarsByMake(cars);

  const formattedFuelType = deslugify(fuelType);

  const title = `${formattedFuelType} Cars in Singapore`;
  const description = `${formattedFuelType} cars overview. Explore registration trends, statistics and distribution by fuel type for the month in Singapore.`;
  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
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
            <MonthSelector months={months} />
          </div>
        </div>
        {filteredCars.length > 0 && <CarOverviewTrends cars={filteredCars} />}
        {filteredCars.length === 0 && <NoData />}
      </div>
    </>
  );
};

export default CarsByFuelTypePage;
