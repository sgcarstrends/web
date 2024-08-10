import Link from "next/link";
import { MonthSelect } from "@/app/components/MonthSelect";
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
import { CarPieChart } from "@/components/CarPieChart";
import { Leaderboard } from "@/components/Leaderboard";
import { API_URL, FUEL_TYPE } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import { formatPercent } from "@/utils/formatPercent";
import type { Car } from "@/types";
import Typography from "@/components/Typography";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";

interface CarsPageProps {
  searchParams: { [key: string]: string };
}

const VEHICLE_TYPE_MAP: Record<string, string> = {
  "Multi-purpose Vehicle": "MPV",
  "Multi-purpose Vehicle/Station-wagon": "MPV/Station-wagon",
  "Sports Utility Vehicle": "SUV",
};

const StatisticsCard = ({
  title,
  data,
  total,
}: {
  title: string;
  data: Record<string, number>;
  total: number;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {/*<CardDescription></CardDescription>*/}
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 gap-4">
        <CarPieChart data={data} />
        <ul>
          {Object.entries(data)
            .filter(([_, value]) => value)
            .map(([key, value]) => {
              return (
                <li key={key}>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-semibold">
                      {value} ({formatPercent(value / total)})
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </CardContent>
  </Card>
);

const CarsPage = async ({ searchParams }: CarsPageProps) => {
  let { month } = searchParams;
  // TODO: Interim solution
  if (!month) {
    const latestMonths = await fetchApi<{ [key: string]: string }>(
      `${API_URL}/months/latest`,
      { next: { tags: ["cars"] } },
    );
    month = latestMonths.cars;
  }

  const cars = await fetchApi<Car[]>(`${API_URL}/cars?month=${month}`, {
    next: { tags: ["cars"] },
  });
  const months = await fetchApi<string[]>(`${API_URL}/months`);
  const total = cars.reduce((accum, curr) => accum + (curr.number || 0), 0);

  const aggregateData = (data: any[], key: keyof Car): Record<string, number> =>
    data.reduce((acc, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + (item.number || 0);
      return acc;
    }, {});

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
      <div className="flex items-center gap-x-4">
        <Typography.H1>Car Registrations for </Typography.H1>
        <div className="inline-block">
          <MonthSelect months={months} defaultMonth={month} />
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
              <div className="grid gap-4 lg:col-span-2 xl:col-span-3">
                <StatisticsCard
                  title="By Fuel Type"
                  data={numberByFuelType}
                  total={total}
                />
                <StatisticsCard
                  title="By Vehicle Type"
                  data={numberByVehicleType}
                  total={total}
                />
              </div>
              <div className="grid gap-4 lg:col-span-2 xl:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Leaderboard</CardTitle>
                    <CardDescription>
                      For {formatDateToMonthYear(month)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Leaderboard cars={cars} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          {/*TODO: Interim solution*/}
          {Object.keys(numberByFuelType).includes(FUEL_TYPE.OTHERS) && (
            <p className="text-sm text-muted-foreground">
              Note: We do not know what is the Land Transport Authority&apos;s
              exact definition of &quot;Others&quot;.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default CarsPage;
