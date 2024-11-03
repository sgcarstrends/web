import { Suspense } from "react";
import { TrendChart } from "@/app/cars/fuel-types/[fuelType]/TrendChart";
import { DataTable } from "@/components/DataTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Car } from "@/types";

interface Props {
  cars: Car[];
}

export const CarOverviewTrends = ({ cars }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={null}>
            <TrendChart data={cars} />
          </Suspense>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable data={cars} />
        </CardContent>
      </Card>
    </div>
  );
};
