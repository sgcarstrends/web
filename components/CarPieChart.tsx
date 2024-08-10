"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CarPieChartProps {
  data: Record<string, number>;
}

interface ChartConfigItem {
  label: string;
  color: string;
}

export const CarPieChart = ({ data }: CarPieChartProps) => {
  const chartData = Object.entries(data)
    .filter(([_, value]) => value)
    .map(([key, value]) => ({
      label: key,
      value,
      fill: `var(--color-${key})`,
    }));

  const chartConfig = Object.keys(data).reduce<Record<string, ChartConfigItem>>(
    (acc, key, index) => {
      acc[key] = {
        label: key,
        color: `hsl(var(--chart-${index + 1}))`,
      };

      return acc;
    },
    {},
  ) satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent />} />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="label"
          innerRadius={50}
          strokeWidth={5}
        />
      </PieChart>
    </ChartContainer>
  );
};
