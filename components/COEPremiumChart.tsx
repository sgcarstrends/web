"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useStore from "@/app/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { COEBiddingResult } from "@/types";

interface Props {
  data: COEBiddingResult[];
}

export const COEPremiumChart = ({ data }: Props) => {
  const categories = useStore((state) => state.categories);
  const filteredData: COEBiddingResult[] = data.map((item) =>
    Object.entries(item).reduce((acc: any, [key, value]) => {
      if (key === "month" || (key.startsWith("Category") && categories[key])) {
        acc[key] = value;
      }
      return acc;
    }, {}),
  );

  const colours: string[] = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#ff3d00",
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quota Premium Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => formatDateToMonthYear(value)}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.entries(categories)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(
                ([category, value], index) =>
                  value && (
                    <Line
                      key={category}
                      type="monotone"
                      dataKey={category}
                      stroke={colours[index]}
                      name={category}
                      dot={false}
                    />
                  ),
              )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
