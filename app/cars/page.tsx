import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CarPieChart } from "@/components/CarPieChart";
import { API_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { formatPercent } from "@/utils/formatPercent";
import type { Car } from "@/types";

interface CarsPageProps {
  searchParams: { [key: string]: string | string[] };
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
  const { month } = searchParams;
  const cars = await fetchApi<Car[]>(`${API_URL}/cars?month=${month}`);
  const total = cars.reduce((accum, curr) => accum + (curr.number || 0), 0);

  const numberByFuelTypeMap: Record<string, number> = {};
  cars.map(({ fuel_type, number }) => {
    if (!numberByFuelTypeMap[fuel_type]) {
      numberByFuelTypeMap[fuel_type] = 0;
    }

    numberByFuelTypeMap[fuel_type] += number || 0;
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

  return (
    <div>
      <ul>
        <li>Add links to the respective fuel type</li>
        <li>Yearly OR YTD if not a full year metrics</li>
        <li>Show trending Petrol/Electric/Hybrid makes</li>
        <li>
          Show the leader for each fuel type (e.g. Petrol - BMW, Hybrid -
          Toyota, Electric - BYD, Diesel - Toyota)
        </li>
      </ul>
      <div className="grid gap-4 xl:grid-cols-2">
        <StatisticsCard
          title="By Fuel Type"
          data={numberByFuelTypeMap}
          total={total}
        />
        <StatisticsCard
          title="By Vehicle Type"
          data={numberByVehicleType}
          total={total}
        />
      </div>
    </div>
  );
};

export default CarsPage;
