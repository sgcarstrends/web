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
import { mergeCarsByVehicleType } from "@/utils/mergeCarsByVehicleType";
import type { Metadata } from "next";
import type { Dataset, WithContext } from "schema-dts";

type Params = Promise<{ vehicleType: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const generateMetadata = async (props: {
  params: Params;
}): Promise<Metadata> => {
  const params = await props.params;
  let { vehicleType } = params;
  vehicleType = decodeURIComponent(vehicleType);
  const description = `${capitaliseWords(vehicleType)} historical trends`;
  const images = `/api/og?title=Historical Trend&type=${vehicleType}`;
  const canonicalUrl = `/cars/vehicle-types/${vehicleType}`;

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

const vehicleTypes = [
  "hatchback",
  "sedan",
  "multi-purpose vehicle",
  "station-wagon",
  "sports utility vehicle",
  "coupe/convertible",
];

export const generateStaticParams = () =>
  vehicleTypes.map((vehicleType) => ({ vehicleType }));

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

  const filteredCars = mergeCarsByVehicleType(cars);

  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${capitaliseWords(vehicleType)} Car Registrations in Singapore`,
    description: `Overview and registration statistics for ${vehicleType} cars in Singapore by vehicle type`,
    url: `${SITE_URL}/cars/vehicle-types/${vehicleType}`,
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
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="flex items-end gap-2">
            <Typography.H1 className="uppercase">
              {capitaliseWords(decodeURIComponent(vehicleType))}
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

export default CarsByVehicleTypePage;
