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
import { mergeCarsByFuelType } from "@/utils/mergeCarsByFuelType";
import type { Metadata } from "next";
import type { Dataset, WithContext } from "schema-dts";

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
  const images = `${SITE_URL}/api/og?type=${fuelType}&month=${month}`;
  const pageUrl = `/cars/fuel-types/${fuelType}`;

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

  const filteredCars = mergeCarsByFuelType(cars);

  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${capitaliseWords(fuelType)} Car Registrations in Singapore`,
    description: `Overview and registration statistics for ${fuelType} cars in Singapore by make`,
    url: `${SITE_URL}/cars/fuel-types/${fuelType}`,
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
