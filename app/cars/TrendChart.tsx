"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
  const chartConfig = {
    number: {
      label: "Count",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="make"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="number" fill="var(--primary)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
};

export default TrendChart;
