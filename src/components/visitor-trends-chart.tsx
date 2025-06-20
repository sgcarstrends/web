"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface Props {
  data: Array<{
    date: string;
    count: number;
  }>;
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  count: {
    label: "Count",
  },
} satisfies ChartConfig;

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-SG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const VisitorTrendsChart = ({ data }: Props) => {
  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toISOString().split("T")[0], // Format as YYYY-MM-DD
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Trends</CardTitle>
        <CardDescription>
          Daily page views over the last 30 days
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart accessibilityLayer data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={formatDate}
            />
            <YAxis axisLine={false} tickLine={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
            <Line dataKey="count" type="natural" strokeWidth={2} dot={true} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
