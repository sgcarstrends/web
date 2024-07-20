"use client";

import { useAtomValue } from "jotai";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { showCategoriesAtom } from "@/atoms/coeAtom";
import { COEBiddingResult } from "@/types";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";

interface COEPremiumChartProps {
  data: COEBiddingResult[];
}

export const COEPremiumChart = ({ data }: COEPremiumChartProps) => {
  const filterCategories = useAtomValue(showCategoriesAtom);
  const filteredData = data.map((item) =>
    Object.entries(item).reduce((acc: any, [key, value]) => {
      if (
        key === "month" ||
        (key.startsWith("Category") && filterCategories[key])
      ) {
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
            {Object.entries(filterCategories)
              .sort()
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
