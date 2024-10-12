"use client";

import { type CSSProperties, useMemo, useState } from "react";
import numberFormat from "@ruchernchong/number-format";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";
import useStore from "@/app/store";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { COEBiddingResult, COECategory } from "@/types";

interface Props {
  data: COEBiddingResult[];
}

export const COEPremiumChart = ({ data }: Props) => {
  const categories = useStore(({ categories }) => categories);

  const [timeRange, setTimeRange] = useState("360d");

  const filteredData: COEBiddingResult[] = useMemo(
    () =>
      data
        .filter((item) => {
          const date = new Date(item.month);
          const now = new Date();
          let daysToSubtract = 360;
          if (timeRange === "1800d") {
            daysToSubtract = 1800;
          }
          now.setDate(now.getDate() - daysToSubtract);
          return date >= now;
        })
        .map((item) =>
          Object.entries(item).reduce((acc: any, [key, value]) => {
            if (
              key === "month" ||
              (key.startsWith("Category") && categories[key as COECategory])
            ) {
              acc[key] = value;
            }

            return acc;
          }, {}),
        ),
    [categories, data, timeRange],
  );

  const chartConfig = {} satisfies ChartConfig;

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Quota Premium ($)</CardTitle>
          <CardDescription>
            Showing the last 12 months of historical trends
          </CardDescription>
        </div>
        <UnreleasedFeature>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto">
              <SelectValue placeholder="Last 12 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="360d" className="rounded-lg">
                Last 12 months
              </SelectItem>
              <SelectItem value="1800d" className="rounded-lg">
                Last 5 years
              </SelectItem>
            </SelectContent>
          </Select>
        </UnreleasedFeature>
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart accessibilityLayer data={filteredData}>
            <CartesianGrid />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => formatDateToMonthYear(value)}
              axisLine={false}
            />
            <YAxis
              domain={[
                (dataMin) => Math.floor(dataMin / 10000) * 10000,
                (dataMax) => Math.ceil(dataMax / 10000) * 10000,
              ]}
              tickFormatter={(value) => numberFormat(value)}
              axisLine={false}
            >
              <Label
                value="Quota Premium (S$)"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => formatDateToMonthYear(value)}
                  formatter={(value: any, name, _, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--colour-bg]"
                        style={
                          {
                            "--colour-bg": `hsl(var(--chart-${index + 1}))`,
                          } as CSSProperties
                        }
                      />
                      {name}
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
