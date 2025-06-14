import { notFound } from "next/navigation";
import { BarChart3, CarFront, Fuel } from "lucide-react";
import { loadSearchParams } from "@/app/cars/search-params";
import { AnimatedNumber } from "@/components/animated-number";
import { LastUpdated } from "@/components/last-updated";
import { MetricsComparison } from "@/components/metrics-comparison";
import { StatCard } from "@/components/stat-card";
import { StructuredData } from "@/components/structured-data";
import { TopMakes } from "@/components/top-makes";
import Typography from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LAST_UPDATED_CARS_KEY, SITE_TITLE, SITE_URL } from "@/config";
import redis from "@/config/redis";
import { type LatestMonth, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetch-api";
import { formatDateToMonthYear } from "@/utils/format-date-to-month-year";
import type { Comparison, Registration, TopMake, TopType } from "@/types/cars";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  searchParams: Promise<SearchParams>;
}

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  let { month } = await loadSearchParams(searchParams);

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`/months/latest`);
    month = latestMonth.cars;
  }

  const formattedMonth = formatDateToMonthYear(month);

  const title = `${formattedMonth} Car Registrations`;
  const description = `Discover ${formattedMonth} car registrations in Singapore. See detailed stats by fuel type, vehicle type, and top brands.`;

  const getTopTypes = fetchApi<TopType>(`/cars/top-types?month=${month}`);
  const getCarRegistration = fetchApi<Registration>(`/cars?month=${month}`);
  const [topTypes, carRegistration] = await Promise.all([
    getTopTypes,
    getCarRegistration,
  ]);
  const images = `/api/og?title=Car Registrations&subtitle=Monthly Stats Summary&month=${month}&total=${carRegistration.data.total}&topFuelType=${topTypes.data.topFuelType.name}&topVehicleType=${topTypes.data.topVehicleType.name}`;

  const canonical = `/cars?month=${month}`;

  return {
    title,
    description,
    openGraph: {
      images,
      url: canonical,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images,
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical,
    },
  };
};

const CarsPage = async ({ searchParams }: Props) => {
  let { month } = await loadSearchParams(searchParams);

  // TODO: Interim solution
  if (!month) {
    const latestMonths = await fetchApi<LatestMonth>(`/months/latest`, {
      next: { tags: [RevalidateTags.Cars] },
    });
    month = latestMonths.cars;
  }

  const getCars = fetchApi<Registration>(`/cars?month=${month}`);
  const getComparison = fetchApi<Comparison>(`/cars/compare?month=${month}`);
  const getTopTypes = fetchApi<TopType>(`/cars/top-types?month=${month}`);
  const getTopMakes = fetchApi<TopMake>(`/cars/top-makes?month=${month}`);

  const [cars, comparison, topTypes, topMakes] = await Promise.all([
    getCars,
    getComparison,
    getTopTypes,
    getTopMakes,
  ]);

  const lastUpdated = await redis.get<number>(LAST_UPDATED_CARS_KEY);

  if (!cars.data) {
    return notFound();
  }

  const formattedMonth = formatDateToMonthYear(month);

  const title = `${formattedMonth} Car Registrations`;
  const description = `Discover ${formattedMonth} car registrations in Singapore. See detailed stats by fuel type, vehicle type, and top brands.`;
  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: `${SITE_URL}/cars`,
    publisher: {
      "@type": "Organization",
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
            <Typography.H1>Car Registrations</Typography.H1>
            {lastUpdated && <LastUpdated lastUpdated={lastUpdated} />}
          </div>
        </div>
        {/*TODO: Improvise*/}
        {!cars.data && (
          <Typography.H3>
            No data available for the selected period.
          </Typography.H3>
        )}
        {cars.data && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="size-6 text-blue-600" />
                    Total Registrations
                  </CardTitle>
                  <Badge className="bg-blue-600">{formattedMonth}</Badge>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-blue-600">
                  <AnimatedNumber value={cars.data.total} />
                </CardContent>
                <CardFooter>
                  <MetricsComparison
                    current={cars.data.total}
                    previousMonth={comparison.data.previousMonth.total}
                    previousYear={comparison.data.previousYear.total}
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Fuel className="size-6 text-green-600" />
                    Top Fuel Type
                  </CardTitle>
                  <Badge className="bg-green-600">
                    {topTypes.data.topFuelType.name}
                  </Badge>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-green-600">
                  <AnimatedNumber value={topTypes.data.topFuelType.total} />
                </CardContent>
                <CardFooter>
                  <MetricsComparison
                    current={topTypes.data.topFuelType.total}
                    previousMonth={
                      comparison.data.previousMonth.fuelType.find(
                        (f) => f.label === topTypes.data.topFuelType.name,
                      )?.count ?? 0
                    }
                    previousYear={
                      comparison.data.previousYear.fuelType.find(
                        (f) => f.label === topTypes.data.topFuelType.name,
                      )?.count ?? 0
                    }
                  />
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CarFront className="size-6 text-pink-600" />
                    Top Vehicle Type
                  </CardTitle>
                  <Badge className="bg-pink-600">
                    {topTypes.data.topVehicleType.name}
                  </Badge>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-pink-600">
                  <AnimatedNumber value={topTypes.data.topVehicleType.total} />
                </CardContent>
                <CardFooter>
                  <MetricsComparison
                    current={topTypes.data.topVehicleType.total}
                    previousMonth={
                      comparison.data.previousMonth.vehicleType.find(
                        (v) => v.label === topTypes.data.topVehicleType.name,
                      )?.count ?? 0
                    }
                    previousYear={
                      comparison.data.previousYear.vehicleType.find(
                        (v) => v.label === topTypes.data.topVehicleType.name,
                      )?.count ?? 0
                    }
                  />
                </CardFooter>
              </Card>
              {/*<UnreleasedFeature>*/}
              {/*  <Card>*/}
              {/*    <CardHeader>*/}
              {/*      <CardTitle>Growth Trend: Electric</CardTitle>*/}
              {/*    </CardHeader>*/}
              {/*    <CardContent>*/}
              {/*      <p className="text-4xl font-bold text-purple-600">1037</p>*/}
              {/*    </CardContent>*/}
              {/*  </Card>*/}
              {/*</UnreleasedFeature>*/}
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <StatCard
                title="By Fuel Type"
                description="Distribution of vehicles based on fuel type"
                data={cars.data.fuelType}
                total={cars.data.total}
                linkPrefix="fuel-types"
              />
              <StatCard
                title="By Vehicle Type"
                description="Distribution of vehicles based on vehicle type"
                data={cars.data.vehicleType}
                total={cars.data.total}
                linkPrefix="vehicle-types"
              />
            </div>
            <div className="flex items-center justify-between">
              <Typography.H2>Top Makes by Fuel Type</Typography.H2>
            </div>
            <TopMakes data={topMakes.data} />
          </div>
        )}
      </div>
    </>
  );
};

export default CarsPage;
