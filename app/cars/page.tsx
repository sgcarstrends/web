import { notFound } from "next/navigation";
import { DetailedBreakdown } from "@/app/cars/detailed-breakdown";
import { MonthSelector } from "@/components/MonthSelector";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { AnimatedNumber } from "@/components/animated-number";
import { StatCard } from "@/components/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { API_URL, HYBRID_REGEX, SITE_TITLE, SITE_URL } from "@/config";
import {
  type Car,
  type LatestMonth,
  type Month,
  RevalidateTags,
} from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const generateMetadata = async (props: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const searchParams = await props.searchParams;
  let month = searchParams.month as string;

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`${API_URL}/months/latest`);
    month = latestMonth.cars;
  }

  const formattedMonth = formatDateToMonthYear(month);

  const title = "Car Registrations in Singapore";
  const description = `Discover ${formattedMonth} car registrations in Singapore. See detailed stats by fuel type, vehicle type, and top brands.`;
  const canonical = `/cars`;

  // const images = `/api/og?title=Car Registrations for ${formattedMonth}`;

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

const CarsPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  let month = searchParams.month as string;

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
  const months = await fetchApi<Month[]>(`${API_URL}/cars/months`);
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
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
          <Typography.H1>CAR REGISTRATIONS</Typography.H1>
          <MonthSelector months={months} />
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
