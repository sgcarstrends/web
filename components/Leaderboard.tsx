import {
  Battery,
  Droplet,
  Fuel,
  type LucideIcon,
  Trophy,
  Zap,
} from "lucide-react";
import Typography from "@/components/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Car } from "@/types";

interface Category {
  title: string;
  description?: string;
  icon: LucideIcon;
  colour: string;
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
    icon: Trophy,
    colour: "text-yellow-600",
  },
  {
    title: "Petrol",
    description: "Internal Combustion Engine (ICE) vehicles",
    icon: Fuel,
    colour: "text-red-600",
    link: "/cars/petrol",
  },
  {
    title: "Hybrid",
    description: "Includes Petrol, Diesel and Plug-In types",
    icon: Zap,
    colour: "text-blue-600",
    link: "/cars/hybrid",
  },
  {
    title: "Electric",
    description: "Battery Electric Vehicles (BEV)",
    icon: Battery,
    colour: "text-green-600",
    link: "/cars/electric",
  },
  {
    title: "Diesel",
    description: "Compression-ignition engine vehicles",
    icon: Droplet,
    colour: "text-gray-600",
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

export const Leaderboard = ({ cars }: LeaderboardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popularity</CardTitle>
        <CardDescription>Top 3 makes in each category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4">
          {CATEGORIES.map(({ title, description, icon: Icon, colour }) => {
            const popularMakes = getPopularMakes(cars, title);

            return (
              <div key={title} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Icon className={`h-6 w-6 ${colour}`} />
                  <div>
                    <Typography.H4>{title}</Typography.H4>
                    <Typography.Muted>{description}</Typography.Muted>
                  </div>
                </div>
                {popularMakes.length === 0 && (
                  <Typography.Muted>
                    No registrations for this period
                  </Typography.Muted>
                )}
                <div className="space-y-3">
                  {popularMakes.map(({ make, number }) => {
                    const maxValue = Math.max(
                      ...popularMakes.map(({ number }) => number),
                    );

                    return (
                      <div key={make} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">{make}</span>
                          <span>{number}</span>
                        </div>
                        <Progress
                          value={(number / maxValue) * 100}
                          indicatorColor={colour.replace("text-", "bg-")}
                          className="h-1.5"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
