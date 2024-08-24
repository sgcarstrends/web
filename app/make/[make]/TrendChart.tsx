"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
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
  const monthlyTotals: { [key: string]: number } = {};
  data.forEach(({ month, number }) => {
    if (monthlyTotals[month]) {
      monthlyTotals[month] += number;
    } else {
      monthlyTotals[month] = number;
    }
  });

  const chartData = Object.entries(monthlyTotals).map(([month, number]) => ({
    month,
    number,
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickMargin={8} />
        <ChartTooltip
          content={<ChartTooltipContent indicator="line" label />}
        />
        <Area
          dataKey="number"
          type="monotone"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
};

const chartConfig = {
  number: {
    label: "Count",
  },
} satisfies ChartConfig;
