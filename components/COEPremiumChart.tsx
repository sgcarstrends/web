"use client";

import { CartesianGrid, Legend, Line, LineChart, XAxis } from "recharts";
import useStore from "@/app/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { COEBiddingResult, COECategory } from "@/types";

interface Props {
  data: COEBiddingResult[];
}

export const COEPremiumChart = ({ data }: Props) => {
  const categories = useStore(({ categories }) => categories);
  const filteredData: COEBiddingResult[] = data.map((item) =>
    Object.entries(item).reduce((acc: any, [key, value]) => {
      if (
        key === "month" ||
        (key.startsWith("Category") && categories[key as COECategory])
      ) {
        acc[key] = value;
      }

      return acc;
    }, {}),
  );

  const chartConfig = {} satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quota Premium Trends</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => formatDateToMonthYear(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {Object.entries(categories).map(
              ([category, value], index) =>
                value && (
                  <Line
                    key={category}
                    dataKey={category}
                    name={category}
                    type="natural"
                    stroke={`hsl(var(--chart-${index + 1}))`}
                    strokeWidth={2}
                    dot={false}
                  />
                ),
            )}
            <ChartLegend />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
