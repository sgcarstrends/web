import dynamic from "next/dynamic";
import { fetchMonths } from "@/app/(default)/cars/utils/fetchMonths";
import { EmptyData } from "@/components/EmptyData";
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

type Params = Promise<{ vehicleType: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const CarOverviewTrends = dynamic(
  () => import("@/app/components/CarOverviewTrends"),
);
const MonthSelector = dynamic(() => import("@/components/MonthSelector"));

export const generateMetadata = async (props: {
  params: Params;
}): Promise<Metadata> => {
  const params = await props.params;
  const { vehicleType } = params;

  const formattedVehicleType = deslugify(vehicleType);
  // const images = `/api/og?title=Historical Trend&type=${vehicleType}`;
  const canonicalUrl = `/cars/vehicle-types/${vehicleType}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: `${formattedVehicleType} Cars in Singapore`,
    description: `Explore registration trends and statistics for ${formattedVehicleType} cars in Singapore.`,
    openGraph: {
      images: "/opengraph-image.png",
      url: canonicalUrl,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: "/opengraph-image.png",
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical: canonicalUrl,
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

const CarsByVehicleTypePage = async (props: {
  params: Params;
  searchParams: SearchParams;
}) => {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { vehicleType } = params;

  const [months, latestMonth]: [Month[], LatestMonth] = await fetchMonths();

  const month = searchParams?.month ?? latestMonth.cars;
  const cars = await fetchApi<Car[]>(
    `${API_URL}/cars?vehicle_type=${vehicleType}&month=${month}`,
    { next: { tags: [RevalidateTags.Cars] } },
  );

  if (cars.length === 0) {
    return <EmptyData />;
  }

  const filteredCars = mergeCarsByMake(cars);

  const formattedVehicleType = deslugify(vehicleType);
  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${formattedVehicleType} Cars in Singapore`,
    description: `Explore registration trends and statistics for ${formattedVehicleType} cars in Singapore.`,
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
