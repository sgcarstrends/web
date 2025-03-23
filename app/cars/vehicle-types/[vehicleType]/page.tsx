import dynamic from "next/dynamic";
import { type SearchParams } from "nuqs/server";
import { fetchMonths } from "@/app/cars/utils/fetchMonths";
import { loadSearchParams } from "@/app/cars/vehicle-types/[vehicleType]/search-params";
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
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  params: Promise<{ vehicleType: string }>;
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
  const { vehicleType } = await params;
  const { month } = await loadSearchParams(searchParams);

  const formattedVehicleType = deslugify(vehicleType);
  const title = `${formattedVehicleType} Cars in Singapore`;
  const description = `${formattedVehicleType} cars registrations by month. Explore registration trends, statistics and distribution by vehicle type for the month in Singapore.`;
  // const images = `/api/og?title=Historical Trend&type=${vehicleType}`;
  const canonical = `/cars/vehicle-types/${vehicleType}?month=${month}`;

  return {
    title,
    description,
    openGraph: {
      images: `${SITE_URL}/opengraph-image.png`,
      url: canonical,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: `${SITE_URL}/twitter-image.png`,
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical,
    },
  };
};

const vehicleTypes = [
  "hatchback",
  "sedan",
  "multi-purpose vehicle",
  "station-wagon",
  "sports utility vehicle",
  "coupe/convertible",
];

export const generateStaticParams = () =>
  vehicleTypes.map((vehicleType) => ({ vehicleType: slugify(vehicleType) }));

const CarsByVehicleTypePage = async ({ params, searchParams }: Props) => {
  const { vehicleType } = await params;
  const { month } = await loadSearchParams(searchParams);

  const queries = {
    vehicle_type: vehicleType,
    ...(month && { month }),
  };
  const search = new URLSearchParams(queries);

  const [months]: [Month[], LatestMonth] = await fetchMonths();
  const cars = await fetchApi<Car[]>(`${API_URL}/cars?${search.toString()}`, {
    next: { tags: [RevalidateTags.Cars] },
  });

  if (cars.length === 0) {
    return <NoData />;
  }

  const filteredCars = mergeCarsByMake(cars);

  const formattedVehicleType = deslugify(vehicleType);

  const title = `${formattedVehicleType} Cars in Singapore`;
  const description = `${formattedVehicleType} cars registrations by month. Explore registration trends, statistics and distribution by vehicle type for the month in Singapore.`;
  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}/cars/vehicle-types/${vehicleType}`,
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
            <Typography.H1>
              {deslugify(vehicleType).toUpperCase()}
            </Typography.H1>
          </div>
          <div className="items-end">
            <MonthSelector months={months} />
          </div>
        </div>
        <CarOverviewTrends cars={filteredCars} />
      </div>
    </>
  );
};

export default CarsByVehicleTypePage;
