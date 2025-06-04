import Link from "next/link";
import { Battery, Droplet, Fuel, type LucideIcon, Zap } from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Car } from "@/types";

interface Category {
  title: string;
  description?: string;
  icon: LucideIcon;
  colour: string;
  url: string;
}

type PopularMake = Pick<Car, "make" | "number">;

interface Props {
  cars: Car[];
}

const CATEGORIES: Category[] = [
  // {
  //   title: "Overall",
  //   description: "Combination of all fuel types",
  //   icon: Trophy,
  //   colour: "text-yellow-600",
  // },
  {
    title: "Petrol",
    description: "Internal Combustion Engine (ICE) vehicles",
    icon: Fuel,
    colour: "text-red-600",
    url: "/cars/fuel-types/petrol",
  },
  {
    title: "Hybrid",
    description: "Includes Petrol, Diesel and Plug-In types",
    icon: Zap,
    colour: "text-blue-600",
    url: "/cars/fuel-types/hybrid",
  },
  {
    title: "Electric",
    description: "Battery Electric Vehicles (BEV)",
    icon: Battery,
    colour: "text-green-600",
    url: "/cars/fuel-types/electric",
  },
  {
    title: "Diesel",
    description: "Compression-ignition engine vehicles",
    icon: Droplet,
    colour: "text-gray-600",
    url: "/cars/fuel-types/diesel",
  },
];

const HYBRID_TYPES: string[] = [
  "Petrol-Electric",
  "Petrol-Electric (Plug-In)",
  "Diesel-Electric",
];

const getPopularMakes = (cars: Car[], fuelType: string): PopularMake[] => {
  const makeCount: Record<string, number> = {};

  cars.forEach(({ make, number, fuel_type }, index) => {
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

export const TopMakes = ({ cars }: Props) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        {CATEGORIES.map(({ title, description, icon: Icon, colour, url }) => {
          const popularMakes = getPopularMakes(cars, title);

          if (popularMakes.length === 0) {
            return null;
          }

          return (
            <Card key={title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`size-6 ${colour}`} />
                  {title}
                </CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
              <CardContent>
                {popularMakes.map(({ make, number }) => {
                  const maxValue = Math.max(
                    ...popularMakes.map(({ number }) => number),
                  );

                  return (
                    <div
                      key={make}
                      className="flex justify-between border-b py-2"
                    >
                      <span>{make.toUpperCase()}</span>
                      <div className="flex items-center gap-2">
                        <AnimatedNumber value={number} />
                        <progress
                          className="progress w-16"
                          value={number / maxValue}
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
              <CardFooter>
                <Link href={url} className="underline">
                  View More
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};
