import Link from "next/link";
import slugify from "@sindresorhus/slugify";
// import { TrendChart } from "@/app/cars/trend-chart";
import { AnimatedNumber } from "@/components/animated-number";
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
  total: number;
}

export const CarOverviewTrends = ({ cars, total }: Props) => (
  <div className="grid grid-cols-1 gap-4">
    {/*<Card>*/}
    {/*  <CardHeader>*/}
    {/*    <CardTitle>By Make</CardTitle>*/}
    {/*    <CardDescription>Top 10 makes</CardDescription>*/}
    {/*  </CardHeader>*/}
    {/*  <CardContent>*/}
    {/*    <TrendChart data={cars} />*/}
    {/*  </CardContent>*/}
    {/*</Card>*/}
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
            cars.map(({ name, count }) => {
              const marketShare = (number: number) => number / total;

              return (
                <div
                  key={name}
                  className="flex items-center justify-between border-b py-2"
                >
                  <Link href={`/cars/makes/${slugify(name)}`}>{name}</Link>
                  <div className="flex items-center gap-2">
                    <AnimatedNumber value={count} />
                    <progress
                      className="progress w-32"
                      value={marketShare(count)}
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
