import dynamic from "next/dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Car } from "@/types";

interface Props {
  cars: Car[];
}

const DataTable = dynamic(() => import("@/components/DataTable"));
const TrendChart = dynamic(() => import("@/app/(default)/cars/TrendChart"));

export const CarOverviewTrends = ({ cars }: Props) => {
  const total = cars.reduce((acc, curr) => acc + curr.number, 0);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <TrendChart data={cars} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Distribution Table</CardTitle>
          <CardDescription>
            A total of <span className="font-bold">{total}</span> registrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={cars} />
        </CardContent>
      </Card>
    </div>
  );
};

export default CarOverviewTrends;
