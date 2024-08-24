import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MonthSelect } from "@/app/components/MonthSelect";
import { CarPieChart } from "@/components/CarPieChart";
import { Leaderboard } from "@/components/Leaderboard";
import Typography from "@/components/Typography";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL, FUEL_TYPE, HYBRID_REGEX } from "@/config";
import { type Car, type LatestMonth, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import { formatPercent } from "@/utils/formatPercent";
import type { Metadata } from "next";

interface Props {
  searchParams: { [key: string]: string };
}

const VEHICLE_TYPE_MAP: Record<string, string> = {
  "Multi-purpose Vehicle": "MPV",
  "Multi-purpose Vehicle/Station-wagon": "MPV/Station-wagon",
  "Sports Utility Vehicle": "SUV",
};

export const generateMetadata = async ({
  searchParams,
}: Props): Promise<Metadata> => {
  let month = searchParams?.month;

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`${API_URL}/months/latest`);
    month = latestMonth.cars;
  }

  const formattedDate = formatDateToMonthYear(month);
  const pageUrl = `/cars`;
  const images = `/api/og?title=Car Registrations for ${formattedDate}`;

  return {
    title: "Car Registrations",
    description: `Breakdown of the cars registered in ${formattedDate} by fuel type and vehicle type`,
    openGraph: {
      images,
    },
    twitter: { images },
    alternates: {
      canonical: pageUrl,
    },
  };
};

const CarsPage = async ({ searchParams }: Props) => {
  let { month } = searchParams;
  // TODO: Interim solution
  if (!month) {
    const latestMonths = await fetchApi<{ [key: string]: string }>(
      `${API_URL}/months/latest`,
      { next: { tags: [RevalidateTags.Cars] } },
    );
    month = latestMonths.cars;
  }

  let cars = await fetchApi<Car[]>(`${API_URL}/cars?month=${month}`, {
    next: { tags: [RevalidateTags.Cars] },
  });
  cars = [...cars].map((car) => {
    let fuelType = car.fuel_type;

    if (HYBRID_REGEX.test(fuelType)) {
      Object.assign(car, { fuel_type: "Hybrid" });
    }

    return car;
  });
  const months = await fetchApi<string[]>(`${API_URL}/months`);
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

  const numberByVehicleType = aggregateData(
    cars.map((car) => ({
      ...car,
      vehicle_type: VEHICLE_TYPE_MAP[car.vehicle_type] || car.vehicle_type,
    })),
    "vehicle_type",
  );
  const [topVehicleType, topVehicleTypeValue] =
    findTopEntry(numberByVehicleType);

  return (
    <div className="flex flex-col gap-8">
      <UnreleasedFeature>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cars</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </UnreleasedFeature>
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-end gap-x-2">
          <Typography.H1>Car Registrations</Typography.H1>
          <Typography.Lead>{formatDateToMonthYear(month)}</Typography.Lead>
        </div>
        <MonthSelect months={months} defaultMonth={month} />
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
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Total Registrations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-blue-600">{total}</p>
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
              <UnreleasedFeature>
                <Card>
                  <CardHeader>
                    <CardTitle>Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-orange-600">
                      Electric
                    </p>
                    <p className="text-gray-600">
                      Steady increase in registrations
                    </p>
                  </CardContent>
                </Card>
              </UnreleasedFeature>
            </div>
            <div className="grid gap-4 lg:grid-cols-4">
              <div className="grid grid-cols-1 gap-4 lg:col-span-2">
                <StatisticsCard
                  title="By Fuel Type"
                  description="Distribution of vehicles based on fuel type"
                  data={numberByFuelType}
                  total={total}
                  linkPrefix="cars"
                />
                <StatisticsCard
                  title="By Vehicle Type"
                  description="Distribution of vehicles based on vehicle type"
                  data={numberByVehicleType}
                  total={total}
                  linkPrefix="vehicle-make"
                />
              </div>
              <div className="grid gap-4 lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                    <CardDescription>
                      Top 3 makes in each category for{" "}
                      {formatDateToMonthYear(month)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Leaderboard cars={cars} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const StatisticsCard = ({
  title,
  description,
  data,
  total,
  // TODO: Temporary solution
  linkPrefix,
}: {
  title: string;
  description: string;
  data: Record<string, number>;
  total: number;
  // TODO: Temporary solution
  linkPrefix?: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-4">
        <CarPieChart data={data} />
        <ul>
          {Object.entries(data)
            .filter(([_, value]) => value)
            .map(([key, value]) => {
              return (
                <li
                  key={key}
                  className="group cursor-pointer rounded px-2 py-1 transition-colors duration-200 hover:bg-secondary"
                >
                  <Link
                    href={`${linkPrefix}/${key.toLowerCase()}`}
                    className="flex items-center justify-between"
                  >
                    <div className="flex gap-1">
                      <span className="text-muted-foreground">{key}</span>
                      <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    </div>
                    <span className="font-semibold text-primary">
                      {value} ({formatPercent(value / total)})
                    </span>
                  </Link>
                </li>
              );
            })}
        </ul>
        {Object.keys(data).includes(FUEL_TYPE.OTHERS) && (
          <p className="text-sm text-muted-foreground">
            Note: We do not know what is the Land Transport Authority&apos;s
            exact definition of &quot;Others&quot;.
          </p>
        )}
      </div>
    </CardContent>
  </Card>
);

export default CarsPage;
