"use client";

import * as React from "react";
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
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

export const BarChartByType = ({ data, type }: Props) => {
  const chartData = Object.entries(data)
    .filter(([_, value]) => value)
    .map(([key, value], index) => ({
      label: key,
      value,
      fill: `var(--chart-${index + 1})`,
    }))
    .sort((a, b) => b.value - a.value);

  const chartConfig = {
    type: {
      label: type,
    },
    ...Object.keys(data).reduce<Record<string, ChartConfigItem>>((acc, key) => {
      acc[key] = { label: key };
      return acc;
    }, {}),
    label: { color: "var(--background)" },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData} layout="vertical">
        <XAxis type="number" dataKey="value" />
        <YAxis
          dataKey="label"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          hide
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="value">
          <LabelList
            dataKey="label"
            position="insideLeft"
            offset={8}
            className="fill-(--color-label)"
            fontSize={12}
          />
          <LabelList
            dataKey="value"
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

export default BarChartByType;
