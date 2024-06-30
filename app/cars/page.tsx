import Link from "next/link";
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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CarPieChart } from "@/components/CarPieChart";
import {
  API_URL,
  FEATURE_FLAG_RELEASED,
  FUEL_TYPE,
  MEDAL_MAPPING,
} from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { formatPercent } from "@/utils/formatPercent";
import type { Car } from "@/types";

interface CarsPageProps {
  searchParams: { [key: string]: string | string[] };
}

interface PopularityListProps {
  title: string;
  data: Pick<Car, "make" | "number">[];
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
      <CardDescription></CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-4 xl:grid-cols-2">
        <CarPieChart data={data} />
        <ul>
          {Object.entries(data).map(([key, value]) => {
            return (
              <li key={key}>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{key}</span>
                  <span className="font-bold">
                    {formatPercent(value / total)}
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
    );
    month = latestMonths.cars;
  }

  const cars = await fetchApi<Car[]>(`${API_URL}/cars?month=${month}`);
  const total = cars.reduce((accum, curr) => accum + (curr.number || 0), 0);

  const numberByFuelType: Record<string, number> = {};
  cars.map(({ fuel_type, number }) => {
    if (!numberByFuelType[fuel_type]) {
      numberByFuelType[fuel_type] = 0;
    }

    numberByFuelType[fuel_type] += number || 0;
  });

  const numberByVehicleType: Record<string, number> = {};
  cars.map(({ vehicle_type, number }) => {
    if (VEHICLE_TYPE_MAP.hasOwnProperty(vehicle_type)) {
      vehicle_type = VEHICLE_TYPE_MAP[vehicle_type];
    }

    if (!numberByVehicleType[vehicle_type]) {
      numberByVehicleType[vehicle_type] = 0;
    }

    numberByVehicleType[vehicle_type] += number || 0;
  });

  const getPopularMakesByFuelType = (fuelType?: string) => {
    let popularMakeByType: Record<string, number> = {};
    const filteredCars = cars.filter(({ fuel_type }) => fuel_type === fuelType);

    if (!fuelType) {
      cars.map(({ make, number }) => {
        popularMakeByType[make] =
          (popularMakeByType[make] || 0) + (number || 0);
      });
    } else if (fuelType === "hybrid") {
      const HYBRIDS = [
        "Petrol-Electric",
        "Petrol-Electric (Plug-In)",
        "Diesel-Electric",
      ];
      cars
        .filter(({ fuel_type }) => HYBRIDS.includes(fuel_type))
        .map(({ make, number }) => {
          popularMakeByType[make] =
            (popularMakeByType[make] || 0) + (number || 0);
        });
    } else {
      filteredCars.map(({ make, number }) => {
        popularMakeByType[make] =
          (popularMakeByType[make] || 0) + (number || 0);
      });
    }

    const popularMakes = Object.entries(popularMakeByType)
      .map(([make, number]) => ({ make, number }))
      .sort((a, b) => b.number - a.number)
      .slice(0, 3);

    return popularMakes;
  };

  const PopularityList = ({ title, data }: PopularityListProps) => (
    <>
      <div className="font-semibold">{title}</div>
      <ol className="grid gap-2">
        {data.map(({ make, number }, index) => (
          <li key={make} className="flex items-center justify-between">
            <span className="flex gap-x-2 text-muted-foreground">
              {/*TODO: Switch this to the brand logos instead*/}
              <span>{MEDAL_MAPPING[index + 1]}</span>
              <Link href={`/make/${make}?month=${month}`}>{make}</Link>
            </span>
            <span>{number}</span>
          </li>
        ))}
      </ol>
      <Separator className="my-2 last:hidden" />
    </>
  );

  return (
    <div className="flex flex-col gap-8">
      {FEATURE_FLAG_RELEASED && (
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
      )}
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h1>
      <ul>
        <li>Add links to the respective fuel type</li>
        <li>Yearly OR YTD if not a full year metrics</li>
        <li>Show trending Petrol/Electric/Hybrid makes</li>
      </ul>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total</CardTitle>
            <CardDescription>Last 4 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-primary">{total}</div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
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
        {/*TODO: Interim solution*/}
        <div className="grid gap-4 lg:col-span-2 xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Popularity</CardTitle>
              <CardDescription>For the month of {month}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <PopularityList
                  title="Overall"
                  data={getPopularMakesByFuelType()}
                />
                <PopularityList
                  title="Petrol"
                  data={getPopularMakesByFuelType(FUEL_TYPE.PETROL)}
                />
                <PopularityList
                  title="Hybrid"
                  data={getPopularMakesByFuelType("hybrid")}
                />
                <PopularityList
                  title="Electric"
                  data={getPopularMakesByFuelType(FUEL_TYPE.ELECTRIC)}
                />
                <PopularityList
                  title="Diesel"
                  data={getPopularMakesByFuelType(FUEL_TYPE.DIESEL)}
                />
                {/*TODO: Interim solution*/}
                {Object.keys(numberByFuelType).includes(FUEL_TYPE.OTHERS) && (
                  <PopularityList
                    title="Others"
                    data={getPopularMakesByFuelType(FUEL_TYPE.OTHERS)}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/*TODO: Interim solution*/}
      {Object.keys(numberByFuelType).includes(FUEL_TYPE.OTHERS) && (
        <p className="text-sm text-muted-foreground">
          Note: We do not know what is the Land Transport Authority&apos;s exact
          definition of &quot;Others&quot;.
        </p>
      )}
    </div>
  );
};

export default CarsPage;
