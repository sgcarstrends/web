import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Leaderboard } from "@/components/Leaderboard";
import { MonthSelector } from "@/components/MonthSelector";
import { StatisticsCard } from "@/components/StatisticsCard";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
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
import type { Dataset, Report, WithContext } from "schema-dts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

// const VEHICLE_TYPE_MAP: Partial<Record<VEHICLE_TYPE, string>> = {
//   "Multi-purpose Vehicle": "MPV",
//   "Multi-purpose Vehicle/Station-wagon": "MPV",
//   "Sports Utility Vehicle": "SUV",
// };

export const generateMetadata = async (props: {
  searchParams: SearchParams;
}): Promise<Metadata> => {
  const searchParams = await props.searchParams;
  let month = searchParams.month as string;

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`${API_URL}/months/latest`);
    month = latestMonth.cars;
  }

  const formattedDate = formatDateToMonthYear(month);
  const pageUrl = `/cars`;

  // const images = `/api/og?title=Car Registrations for ${formattedDate}`;

  return {
    title: "Car Registrations",
    description: `Breakdown of cars registered in ${formattedDate} by fuel types and vehicle types.`,
    openGraph: { url: pageUrl },
    twitter: { card: "summary_large_image" },
    alternates: { canonical: pageUrl },
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
    const { fuel_type } = car;

    if (HYBRID_REGEX.test(fuel_type)) {
      Object.assign(car, { fuel_type: "Hybrid" });
    }

    return car;
  });
  const months = await fetchApi<Month[]>(`${API_URL}/cars/months`);
  const total = cars.reduce((accum, curr) => accum + (curr.number || 0), 0);

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
  const datasetJsonLd: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `Singapore Car Registrations ${formattedMonth}`,
    description: `Comprehensive overview of car registrations in Singapore for ${formattedMonth}, including total registrations, fuel types, vehicle types, and top manufacturers.`,
    url: `${SITE_URL}/cars`,
    creator: {
      "@type": "Organization",
      name: SITE_TITLE,
    },
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Total Registrations",
        value: total,
      },
      {
        "@type": "PropertyValue",
        name: "Top Fuel Type",
        value: `${topFuelType} (${topFuelTypeValue})`,
      },
      {
        "@type": "PropertyValue",
        name: "Top Vehicle Type",
        value: `${topVehicleType} (${topVehicleTypeValue})`,
      },
    ],
  };
  const reportJsonLd: WithContext<Report> = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: `Singapore Car Registrations Report - ${formattedMonth}`,
    description: `Breakdown of the cars registered in ${formattedMonth} by fuel type and vehicle type`,
    url: `${SITE_URL}/cars`,
    author: {
      "@type": "Organization",
      name: "SGCarsTrends",
    },
    genre: "Statistical Report",
    mentions: [
      {
        "@type": "Thing",
        name: "Toyota",
        description: "Top overall manufacturer with 652 registrations",
      },
      {
        "@type": "Thing",
        name: `${topFuelType}`,
        description: `Most popular fuel type with ${topFuelTypeValue} registrations`,
      },
      {
        "@type": "Thing",
        name: `${topVehicleType}`,
        description: `Most popular vehicle type with ${topVehicleTypeValue} registrations`,
      },
    ],
  };

  return (
    <>
      <StructuredData data={datasetJsonLd} />
      <StructuredData data={reportJsonLd} />
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div className="flex items-end gap-2">
            <Typography.H1>Car Registrations</Typography.H1>
          </div>
          <div className="lg:justify-self-end">
            <Suspense fallback={null}>
              <MonthSelector months={months} />
            </Suspense>
          </div>
        </div>
        {/*TODO: Improvise*/}
        {cars.length === 0 && (
          <Typography.H3>
            No data available for the selected period.
          </Typography.H3>
        )}
        {cars.length > 0 && (
          <>
            <div className="flex flex-col gap-y-4">
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Registrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold text-primary">{total}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Fuel Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-600">
                      {topFuelType} ({topFuelTypeValue})
                    </p>
                    <p className="text-gray-600">Highest adoption rate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Vehicle Type</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-pink-600">
                      {topVehicleType} ({topVehicleTypeValue})
                    </p>
                    <p className="text-gray-600">Highest adoption rate</p>
                  </CardContent>
                </Card>
                {/*<UnreleasedFeature>*/}
                {/*  <Card>*/}
                {/*    <CardHeader>*/}
                {/*      <CardTitle>Trend</CardTitle>*/}
                {/*    </CardHeader>*/}
                {/*    <CardContent>*/}
                {/*      <p className="text-2xl font-bold text-orange-600">*/}
                {/*        Electric*/}
                {/*      </p>*/}
                {/*      <p className="text-gray-600">*/}
                {/*        Steady increase in registrations*/}
                {/*      </p>*/}
                {/*    </CardContent>*/}
                {/*  </Card>*/}
                {/*</UnreleasedFeature>*/}
              </div>
              <div className="grid gap-4 xl:grid-cols-12">
                <div className="grid grid-cols-1 gap-4 xl:col-span-6">
                  <StatisticsCard
                    title="By Fuel Type"
                    description="Distribution of vehicles based on fuel type"
                    data={numberByFuelType}
                    total={total}
                    linkPrefix="fuel-types"
                  />
                  <StatisticsCard
                    title="By Vehicle Type"
                    description="Distribution of vehicles based on vehicle type"
                    data={numberByVehicleType}
                    total={total}
                    linkPrefix="vehicle-types"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 xl:col-span-6">
                  <Leaderboard cars={cars} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CarsPage;
