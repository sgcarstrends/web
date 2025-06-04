"use client";

import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
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
  const chartData = data.slice(0, 10);

  const chartConfig = {
    number: {
      label: "Count",
    },
    label: { color: "var(--background)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <XAxis type="number" dataKey="number" hide />
        <YAxis
          dataKey="make"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
        <Bar dataKey="number" fill="var(--primary)">
          <LabelList
            dataKey="make"
            position="insideLeft"
            offset={8}
            className="fill-(--color-label)"
            fontSize={12}
          />
          <LabelList
            dataKey="number"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
};
