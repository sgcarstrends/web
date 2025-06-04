"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickMargin={8} />
        <ChartTooltip
          content={<ChartTooltipContent indicator="line" label />}
        />
        <Line
          dataKey="number"
          type="monotone"
          fill="var(--primary)"
          stroke="var(--primary)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
};

const chartConfig = {
  number: {
    label: "Count",
  },
} satisfies ChartConfig;
