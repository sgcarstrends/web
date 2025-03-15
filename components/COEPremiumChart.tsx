"use client";

import {
  type CSSProperties,
  // useEffect,
  // useMemo,
  // useState,
} from "react";
// import { usePathname, useRouter } from "next/navigation";
import { numberFormat } from "@ruchernchong/number-format";
// import { parse, subMonths, subYears } from "date-fns";
// import { CalendarIcon } from "lucide-react";
import { CartesianGrid, Label, Line, LineChart, XAxis, YAxis } from "recharts";
import useStore from "@/app/store";
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type {
  COEBiddingResult,
  // COECategory,
  Month,
} from "@/types";

interface Props {
  data: COEBiddingResult[];
  months: Month[];
}

interface TimeRange {
  timeRange: string;
  label: string;
}

// const LAST_12_MONTHS = (30 * 12).toString();
// const LAST_5_YEARS = (5 * 30 * 12).toString();
// const LAST_10_YEARS = (10 * 30 * 12).toString();

export const COEPremiumChart = ({
  data,
  // months
}: Props) => {
  // const router = useRouter();
  // const pathname = usePathname();

  const categories = useStore(({ categories }) => categories);

  // const [timeRange, setTimeRange] = useState(LAST_12_MONTHS);

  // const latestMonth = months[0];
  // const earliestMonth = months[months.length - 1];

  // TODO: Tidy up
  // useEffect(() => {
  //   const params = new URLSearchParams();
  //
  //   const formatMonth = (date: Date) => {
  //     const year = date.getFullYear();
  //     const month = ("0" + date.getMonth()).slice(-2);
  //     return `${year}-${month}`;
  //   };
  //
  //   switch (timeRange) {
  //     case LAST_12_MONTHS:
  //       params.append(
  //         "from",
  //         `${formatMonth(subMonths(parse(latestMonth, "yyyy-MM", new Date()), 12))}`,
  //       );
  //       params.append("to", latestMonth);
  //       break;
  //     case LAST_5_YEARS:
  //       params.append(
  //         "from",
  //         `${formatMonth(subYears(parse(latestMonth, "yyyy-MM", new Date()), 5))}`,
  //       );
  //       params.append("to", latestMonth);
  //       break;
  //     case LAST_10_YEARS:
  //       params.append(
  //         "from",
  //         `${formatMonth(subYears(parse(latestMonth, "yyyy-MM", new Date()), 10))}`,
  //       );
  //       params.append("to", latestMonth);
  //       break;
  //     case "YTD":
  //       params.append("from", `${new Date().getFullYear()}-01`);
  //       params.append("to", latestMonth);
  //       break;
  //     case "ALL":
  //       params.append("from", earliestMonth);
  //       params.append("to", latestMonth);
  //       break;
  //     default:
  //   }
  //
  //   router.push(`${pathname}?${params.toString()}`);
  // }, [earliestMonth, latestMonth, pathname, router, timeRange]);

  // const filteredData: COEBiddingResult[] = useMemo(
  //   () =>
  //     data.map((item) =>
  //       Object.entries(item).reduce((acc: any, [key, value]) => {
  //         if (
  //           key === "month" ||
  //           (key.startsWith("Category") && categories[key as COECategory])
  //         ) {
  //           acc[key] = value;
  //         }
  //
  //         return acc;
  //       }, {}),
  //     ),
  //   [categories, data],
  // );

  const filteredData = data.sort((a, b) => a.month.localeCompare(b.month));

  const chartConfig = {} satisfies ChartConfig;

  // const TIME_RANGES: TimeRange[] = [
  //   { timeRange: LAST_12_MONTHS, label: "Last 12 Months" },
  //   { timeRange: LAST_5_YEARS, label: "Last 5 Years" },
  //   { timeRange: LAST_10_YEARS, label: "Last 10 Years" },
  //   { timeRange: "YTD", label: "Year to Date" },
  //   { timeRange: "ALL", label: "All Time" },
  // ];

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Quota Premium ($)</CardTitle>
          {/*<CardDescription>*/}
          {/*  {`Showing ${TIME_RANGES.find((range) => range.timeRange === timeRange)?.label.toLowerCase()} of COE prices`}*/}
          {/*</CardDescription>*/}
        </div>
        {/*<div>*/}
        {/*  <Select value={timeRange} onValueChange={setTimeRange}>*/}
        {/*    <SelectTrigger className="rounded-lg sm:ml-auto">*/}
        {/*      <SelectValue placeholder="Last 12 months" />*/}
        {/*    </SelectTrigger>*/}
        {/*    <SelectContent className="rounded-xl">*/}
        {/*      {TIME_RANGES.map(({ timeRange, label }) => (*/}
        {/*        <SelectItem*/}
        {/*          key={timeRange}*/}
        {/*          value={timeRange}*/}
        {/*          className="rounded-lg"*/}
        {/*        >*/}
        {/*          <div className="flex items-center rounded-lg">*/}
        {/*            <CalendarIcon className="mr-2 size-4" />*/}
        {/*            {label}*/}
        {/*          </div>*/}
        {/*        </SelectItem>*/}
        {/*      ))}*/}
        {/*    </SelectContent>*/}
        {/*  </Select>*/}
        {/*</div>*/}
      </CardHeader>
      <CardContent className="p-6">
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <LineChart accessibilityLayer data={filteredData}>
            <CartesianGrid />
            <XAxis
              dataKey="month"
              tickFormatter={(value) => formatDateToMonthYear(value)}
              axisLine={false}
            />
            <YAxis
              domain={[
                (dataMin: number) => Math.floor(dataMin / 10000) * 10000,
                (dataMax: number) => Math.ceil(dataMax / 10000) * 10000,
              ]}
              tickFormatter={(value) => numberFormat(value)}
              axisLine={false}
            >
              <Label
                value="Quota Premium (S$)"
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: "middle" }}
              />
            </YAxis>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="line"
                  labelFormatter={(value) => formatDateToMonthYear(value)}
                  formatter={(value: any, name, _, index) => (
                    <>
                      <div
                        className="size-2.5 shrink-0 rounded-[2px] bg-(--colour-bg)"
                        style={
                          {
                            "--colour-bg": `var(--chart-${index + 1})`,
                          } as CSSProperties
                        }
                      />
                      {name}
                      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-medium tabular-nums">
                        {Intl.NumberFormat("en-SG", {
                          style: "currency",
                          currency: "SGD",
                          minimumFractionDigits: 0,
                        }).format(value)}
                      </div>
                    </>
                  )}
                />
              }
            />
            {Object.entries(categories)
              .filter(([key, value]) => value)
              .map(([category, value], index) => (
                <Line
                  key={category}
                  dataKey={category}
                  name={category}
                  type="natural"
                  stroke={`var(--chart-${index + 1})`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            <ChartLegend />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
