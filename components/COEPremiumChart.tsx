"use client";

import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { COEBiddingResult } from "@/types";

interface Props {
  data: COEBiddingResult[];
}

export const COEPremiumChart = ({ data }: Props) => {
  const categories = useStore(({ categories }) => categories);
  const filteredData: COEBiddingResult[] = useMemo(
    () =>
      data.map((item) =>
        Object.entries(item).reduce((acc: any, [key, value]) => {
          if (
            key === "month" ||
            (key.startsWith("Category") && categories[key])
          ) {
            acc[key] = value;
          }

          return acc;
        }, {}),
      ),
    [categories, data],
  );

  const chartConfig = {} satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quota Premium Trends</CardTitle>
        <CardDescription>
          Showing the last 12 months of historical trends
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart accessibilityLayer data={filteredData}>
            <CartesianGrid />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => formatDateToMonthYear(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => formatDateToMonthYear(value)}
                  formatter={(value, name, _, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--colour-bg]"
                        style={{
                          "--colour-bg": `hsl(var(--chart-${index + 1}))`,
                        }}
                      />
                      {chartConfig[name]?.label || name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-medium tabular-nums text-foreground">
                        {Intl.NumberFormat("en-SG", {
                          style: "currency",
                          currency: "SGD",
                          minimumFractionDigits: 0,
                        }).format(value)}
                      </div>
                    </>
                  )}
                />
              }
            />
            {Object.entries(categories)
              .filter(([key, value]) => value)
              .map(([category, value], index) => (
                <Line
                  key={category}
                  dataKey={category}
                  name={category}
                  type="natural"
                  stroke={`hsl(var(--chart-${index + 1}))`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            <ChartLegend />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
