import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Battery,
  Droplet,
  Fuel,
  Trophy,
  Zap,
} from "lucide-react";
import Typography from "@/components/Typography";
import { Separator } from "@/components/ui/separator";
import type { Car } from "@/types";

interface Category {
  title: string;
  description?: string;
  icon: ReactNode;
  link?: string;
}

type PopularMake = Pick<Car, "make" | "number">;

interface LeaderboardProps {
  cars: Car[];
}

const CATEGORIES: Category[] = [
  {
    title: "Overall",
    description: "Combination of all fuel types",
    icon: <Trophy className="h-6 w-6 text-yellow-600" />,
  },
  {
    title: "Petrol",
    description: "Internal Combustion Engine (ICE) vehicles",
    icon: <Fuel className="h-6 w-6 text-red-600" />,
    link: "/cars/petrol",
  },
  {
    title: "Hybrid",
    description: "Includes Petrol, Diesel and Plug-In types",
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    link: "/cars/hybrid",
  },
  {
    title: "Electric",
    description: "Battery Electric Vehicles (BEV)",
    icon: <Battery className="h-6 w-6 text-green-600" />,
    link: "/cars/electric",
  },
  {
    title: "Diesel",
    description: "Compression-ignition engine vehicles",
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
    <div className="grid grid-cols-1 gap-4">
      {CATEGORIES.map(({ title, description, icon }) => (
        <Fragment key={title}>
          <div className="flex flex-col items-center">
            <Typography.H3>{icon}</Typography.H3>
            <Typography.H4>{title}</Typography.H4>
            <Typography.Muted>{description}</Typography.Muted>
          </div>
          {getPopularMakes(cars, title).length === 0 && (
            <Typography.Muted>
              No registrations for this period
            </Typography.Muted>
          )}
          <ul>
            {getPopularMakes(cars, title).map(({ make, number }) => (
              <li
                key={make}
                className="group cursor-pointer rounded p-1 transition-colors duration-200 hover:bg-secondary"
              >
                <Link
                  href={`/cars/brands/${make}`}
                  className="flex items-center justify-between"
                >
                  <div className="flex gap-1">
                    <span className="text-muted-foreground">{make}</span>
                    <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </div>
                  <span className="font-semibold">{number}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Separator className="last-of-type:hidden" />
        </Fragment>
      ))}
    </div>
  );
};
