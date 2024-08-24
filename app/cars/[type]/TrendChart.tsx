"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Car } from "@/types";

interface Props {
  data: Car[];
}

export const TrendChart = ({ data }: Props) => {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-3))`,
  }));

  const chartConfig = {
    number: {
      label: "Count",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="make"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="number" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};
