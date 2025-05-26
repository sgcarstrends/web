import { notFound } from "next/navigation";
import { DetailedBreakdown } from "@/app/cars/detailed-breakdown";
import { loadSearchParams } from "@/app/cars/search-params";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { AnimatedNumber } from "@/components/animated-number";
import { LastUpdated } from "@/components/last-updated";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  API_URL,
  HYBRID_REGEX,
  LAST_UPDATED_CARS_KEY,
  SITE_TITLE,
  SITE_URL,
} from "@/config";
import redis from "@/config/redis";
import {
  type Car,
  type LatestMonth,
  type Registration,
  RevalidateTags,
} from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { Metadata } from "next";
import type { SearchParams } from "nuqs/server";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  searchParams: Promise<SearchParams>;
}

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  const { month } = await loadSearchParams(searchParams);

  const formattedMonth = formatDateToMonthYear(month as string);

  const title = "Car Registrations in Singapore";
  const description = `Discover ${formattedMonth} car registrations in Singapore. See detailed stats by fuel type, vehicle type, and top brands.`;

  const { data } = await fetchApi<Registration>(
    `${API_URL}/cars/registration?month=${month}`,
  );
  const { total, fuelType, vehicleType } = data;
  const topFuelType = Object.entries(fuelType).reduce(
    (top, current) =>
      current[1] > top.count ? { type: current[0], count: current[1] } : top,
    { type: "", count: -Infinity },
  );

  const topVehicleType = Object.entries(vehicleType).reduce(
    (top, current) =>
      current[1] > top.count ? { type: current[0], count: current[1] } : top,
    { type: "", count: -Infinity },
  );

  const images = `/api/og?title=Car Registrations&subtitle=Monthly Stats Summary&month=${month}&total=${total}&topFuelType=${topFuelType.type}&topVehicleType=${topVehicleType.type}`;

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
    const latestMonths = await fetchApi<LatestMonth>(
      `${API_URL}/months/latest`,
      { next: { tags: [RevalidateTags.Cars] } },
    );
    month = latestMonths.cars;
  }

  let cars = await fetchApi<Car[]>(`${API_URL}/cars?month=${month}`, {
    next: { tags: [RevalidateTags.Cars] },
  });

  const lastUpdated = await redis.get<number>(LAST_UPDATED_CARS_KEY);

  if (cars.length === 0) {
    return notFound();
  }

  cars = cars.map((car) => {
    const { fuel_type, vehicle_type } = car;

    if (HYBRID_REGEX.test(fuel_type)) {
      Object.assign(car, { fuel_type: "Hybrid" });
    }

    // Object.assign(car, {
    //   vehicle_type: VEHICLE_TYPE_MAP[vehicle_type] ?? vehicle_type,
    // });

    return car;
  });
  const total = cars.reduce((total, { number = 0 }) => total + number, 0);

  const aggregateData = (
    data: any[],
    key: keyof Car,
  ): Record<string, number> => {
    return data.reduce((acc, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + (item.number || 0);
      return acc;
    }, {});
  };

  const findTopEntry = (data: Record<string, number>) => {
    const entries = Object.entries(data);
    return entries.reduce(
      (max, entry) => (entry[1] > max[1] ? entry : max),
      entries[0],
    );
  };

  const numberByFuelType = aggregateData(cars, "fuel_type");
  const [topFuelType, topFuelTypeValue] = findTopEntry(numberByFuelType);

  const numberByVehicleType = aggregateData(cars, "vehicle_type");
  const [topVehicleType, topVehicleTypeValue] =
    findTopEntry(numberByVehicleType);

  const formattedMonth = formatDateToMonthYear(month);

  const title = "Car Registrations in Singapore";
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
          <Typography.H1>CAR REGISTRATIONS</Typography.H1>
          <div className="text-muted-foreground flex items-center gap-2">
            &mdash;
            <span className="uppercase">{formatDateToMonthYear(month)}</span>
            {lastUpdated && <LastUpdated lastUpdated={lastUpdated} />}
          </div>
        </div>
        {/*TODO: Improvise*/}
        {cars.length === 0 && (
          <Typography.H3>
            No data available for the selected period.
          </Typography.H3>
        )}
        {cars.length > 0 && (
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>Total Registrations</CardTitle>
                  <Badge className="bg-blue-600">{formattedMonth}</Badge>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-blue-600">
                  <AnimatedNumber value={total} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>Top Fuel Type</CardTitle>
                  <Badge className="bg-green-600">{topFuelType}</Badge>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-green-600">
                  <AnimatedNumber value={topFuelTypeValue} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <CardTitle>Top Vehicle Type</CardTitle>
                  <Badge className="bg-pink-600">{topVehicleType}</Badge>
                </CardHeader>
                <CardContent className="text-4xl font-bold text-pink-600">
                  <AnimatedNumber value={topVehicleTypeValue} />
                </CardContent>
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
            <DetailedBreakdown data={cars} />
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <StatCard
                title="By Fuel Type"
                description="Distribution of vehicles based on fuel type"
                data={numberByFuelType}
                total={total}
                linkPrefix="fuel-types"
              />
              <StatCard
                title="By Vehicle Type"
                description="Distribution of vehicles based on vehicle type"
                data={numberByVehicleType}
                total={total}
                linkPrefix="vehicle-types"
              />
              {/*<div className="grid grid-cols-1 gap-4 xl:col-span-6">*/}
              {/*  <Leaderboard cars={cars} />*/}
              {/*</div>*/}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CarsPage;
