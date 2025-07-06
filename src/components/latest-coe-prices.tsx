"use client";

import useStore from "@/app/store";
import { AnimatedNumber } from "@/components/animated-number";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatOrdinal } from "@/utils/format-ordinal";
import type { COEResult } from "@/types";

interface LatestCOEPricesProps {
  results: COEResult[];
}

export const LatestCOEPrices = ({ results }: LatestCOEPricesProps) => {
  const { categories } = useStore();
  const filteredResults = results.filter(
    (result) => categories[result.vehicle_class as keyof typeof categories],
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredResults.map((result) => (
        <Card key={result.vehicle_class}>
          <CardHeader>
            <CardTitle>{result.vehicle_class}</CardTitle>
            <CardDescription>
              {result.month} • {formatOrdinal(result.bidding_no)} Bidding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600 lg:text-4xl">
              S$
              <AnimatedNumber value={result.premium} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
