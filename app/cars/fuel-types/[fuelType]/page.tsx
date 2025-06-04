import { loadSearchParams } from "@/app/cars/fuel-types/[fuelType]/search-params";
import { CarOverviewTrends } from "@/app/components/CarOverviewTrends";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { AnimatedNumber } from "@/components/animated-number";
import { LastUpdated } from "@/components/last-updated";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL, LAST_UPDATED_CARS_KEY, SITE_TITLE, SITE_URL } from "@/config";
import redis from "@/config/redis";
import { type Car, type LatestMonth, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import { mergeCarsByMake } from "@/utils/mergeCarsByMake";
import { deslugify, slugify } from "@/utils/slugify";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  params: Promise<{ fuelType: string }>;
  searchParams: Promise<SearchParams>;
}

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
  let { month } = await loadSearchParams(searchParams);

  // TODO: Interim solution
  if (!month) {
    const latestMonths = await fetchApi<LatestMonth>(
      `${API_URL}/months/latest`,
      { next: { tags: [RevalidateTags.Cars] } },
    );
    month = latestMonths.cars;
  }

  const queries = {
    fuel_type: fuelType,
    ...(month && { month }),
  };
  const search = new URLSearchParams(queries);

  const cars = await fetchApi<Car[]>(`${API_URL}/cars?${search.toString()}`, {
    next: { tags: [RevalidateTags.Cars] },
  });
  const lastUpdated = await redis.get<number>(LAST_UPDATED_CARS_KEY);

  const filteredCars = mergeCarsByMake(cars);

  const total = filteredCars.reduce(
    (total, { number = 0 }) => total + number,
    0,
  );

  const formattedFuelType = deslugify(fuelType);

  const formattedMonth = formatDateToMonthYear(month);

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
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between lg:flex-row lg:items-center">
            <Typography.H1>{deslugify(fuelType)}</Typography.H1>
            {lastUpdated && <LastUpdated lastUpdated={lastUpdated} />}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Registrations</CardTitle>
                <Badge>{formattedMonth}</Badge>
              </CardHeader>
              <CardContent className="text-primary text-4xl font-bold">
                <AnimatedNumber value={total} />
              </CardContent>
            </Card>
          </div>
        </div>
        {filteredCars.length > 0 && <CarOverviewTrends cars={filteredCars} />}
      </div>
    </>
  );
};

export default CarsByFuelTypePage;
