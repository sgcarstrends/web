import { ReactNode } from "react";
import Link from "next/link";
import { Battery, Droplet, Fuel, Trophy, Zap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Typography from "@/components/Typography";
import type { Car } from "@/types";

interface Category {
  title: string;
  icon: ReactNode;
  link: string;
}

type PopularMake = Pick<Car, "make" | "number">;

interface LeaderboardProps {
  cars: Car[];
}

const CATEGORIES: Category[] = [
  {
    title: "Petrol",
    icon: <Fuel className="h-6 w-6 text-red-600" />,
    link: "/cars/petrol",
  },
  {
    title: "Hybrid",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    link: "/cars/hybrid",
  },
  {
    title: "Electric",
    icon: <Battery className="h-6 w-6 text-green-600" />,
    link: "/cars/electric",
  },
  {
    title: "Diesel",
    icon: <Droplet className="h-6 w-6 text-gray-600" />,
    link: "/cars/diesel",
  },
];

const HYBRID_TYPES: string[] = [
  "Petrol-Electric",
  "Petrol-Electric (Plug-In)",
  "Diesel-Electric",
];

const getPopularMakes = (cars: Car[], fuelType: string): PopularMake[] => {
  const makeCount: Record<string, number> = {};

  cars.forEach(({ make, number, fuel_type }) => {
    if (
      fuelType === "Overall" ||
      (fuelType === "Hybrid" && HYBRID_TYPES.includes(fuel_type)) ||
      fuel_type === fuelType
    ) {
      makeCount[make] = (makeCount[make] || 0) + (number || 0);
    }
  });

  return Object.entries(makeCount)
    .filter(([_, number]) => Boolean(number)) // Remove 0 registrations
    .map(([make, number]) => ({ make, number }))
    .sort((a, b) => b.number - a.number)
    .slice(0, 3);
};

export const Leaderboard = ({ cars }: LeaderboardProps) => {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Card className="col-span-full">
        <CardHeader>
          <Trophy className="h-6 w-6 text-yellow-600" />
          <Typography.H3>Overall</Typography.H3>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal">
            {getPopularMakes(cars, "Overall").map(({ make, number }) => (
              <li key={make} className="flex items-center justify-between">
                <span className="flex items-center gap-x-2">
                  <Link href={`/make/${make}`}>{make}</Link>
                </span>
                <span className="font-semibold">{number}</span>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
      {CATEGORIES.map(({ title, icon, link }) => (
        <Card key={title} className="first:col-span-full">
          <CardHeader>
            {icon}
            <Typography.H3 className="flex">{title}</Typography.H3>
          </CardHeader>
          <CardContent>
            {getPopularMakes(cars, title).length === 0 && (
              <Typography.Muted className="text-center">
                No registrations for this period
              </Typography.Muted>
            )}
            <ol className="list-decimal">
              {getPopularMakes(cars, title).map(({ make, number }) => (
                <li key={make} className="flex items-center justify-between">
                  <span className="flex items-center gap-x-2">
                    <Link href={`/make/${make}`}>{make}</Link>
                  </span>
                  <span className="font-semibold">{number}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
