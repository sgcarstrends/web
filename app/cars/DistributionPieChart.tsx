"use client";

import * as React from "react";
import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  data: Record<string, number>;
  type: string;
}

interface ChartConfigItem {
  label: string;
}

export const DistributionPieChart = ({ data, type }: Props) => {
  const chartData = Object.entries(data)
    .filter(([_, value]) => value)
    .map(([key, value], index) => ({
      label: key,
      value,
      fill: `var(--chart-${index + 1})`,
    }));

  const chartConfig = {
    type: {
      label: type,
    },
    ...Object.keys(data).reduce<Record<string, ChartConfigItem>>(
      (acc, key, index) => {
        acc[key] = { label: key };

        return acc;
      },
      {},
    ),
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent labelKey="type" indicator="line" />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="label"
          innerRadius={60}
          label
        />
        <ChartLegend content={<ChartLegendContent />} className="flex-wrap" />
      </PieChart>
    </ChartContainer>
  );
};

export default DistributionPieChart;
