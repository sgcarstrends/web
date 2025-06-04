import Link from "next/link";
import { TrendChart } from "@/app/cars/trend-chart";
import { AnimatedNumber } from "@/components/animated-number";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { slugify } from "@/utils/slugify";
import { sortByValue, SortDirection } from "@/utils/sorting";
import type { Car } from "@/types";

interface Props {
  cars: Car[];
}

export const CarOverviewTrends = ({ cars }: Props) => {
  console.log(cars);
  sortByValue(cars, { sortKey: "number", direction: SortDirection.DESC });
  const total = cars.reduce((acc, curr) => acc + curr.number, 0);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>By Make</CardTitle>
          <CardDescription>Top 10 makes</CardDescription>
        </CardHeader>
        <CardContent>
          <TrendChart data={cars} />
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Stats</CardTitle>
            <CardDescription>
              <span className="font-bold">{total}</span> registrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {cars.length > 0 &&
              cars.map(({ make, number }) => {
                const marketShare = (number: number) => number / total;

                return (
                  <div
                    key={make}
                    className="flex items-center justify-between border-b py-2"
                  >
                    <Link href={`/cars/makes/${slugify(make)}`}>{make}</Link>
                    <div className="flex items-center gap-2">
                      <AnimatedNumber value={number} />
                      <progress
                        className="progress w-32"
                        value={marketShare(number)}
                      />
                    </div>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
