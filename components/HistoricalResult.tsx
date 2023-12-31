"use client";

import dynamic from "next/dynamic";
import { format, parse, subMonths } from "date-fns";
import { CHART_COLOURS } from "@/config";
import { COEResult } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PremiumMap {
  [key: string]: { [key: string]: number };
}

interface HistoricalResultProps {
  data: COEResult[];
}

export const HistoricalResult = ({ data }: HistoricalResultProps) => {
  const processCOEData = (data: COEResult[]) => {
    const quotaPremiumMap: PremiumMap = {};
    const monthsSet = new Set<string>();

    data.forEach(({ month, premium, vehicle_class }) => {
      monthsSet.add(month);
      quotaPremiumMap[vehicle_class] = {
        ...quotaPremiumMap[vehicle_class],
        [month]: parseInt(premium, 10),
      };
    });

    return {
      premiumMap: quotaPremiumMap,
      months: Array.from(monthsSet).sort(),
    };
  };

  const createSeries = (premiumMap: PremiumMap, months: string[]) =>
    Object.entries(premiumMap)
      .map(([vehicleClass, premiums]) => ({
        name: vehicleClass,
        data: months.map((month) => premiums[month] || 0),
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

  const { premiumMap, months } = processCOEData(data);

  const latestMonth = parse(months[months.length - 1], "yyyy-MM", new Date());

  const chartOptions = {
    chart: {
      id: "target-chart",
      toolbar: {
        autoSelected: "pan" as "pan",
        show: false,
      },
    },
    colors: CHART_COLOURS,
    stroke: { curve: "smooth" as "smooth", width: 3 },
    dataLabels: { enabled: false },
    fill: { opacity: 0.8 },
    title: { text: "Historical COE Results", align: "center" as "center" },
    xaxis: {
      type: "datetime" as "datetime",
      categories: months.map((month) => new Date(month).getTime()),
      labels: {
        formatter: (value: string, timestamp: number) =>
          format(new Date(timestamp), "MMM yyyy"),
      },
    },
    yaxis: {
      title: { text: "Quota Premium ($)" },
      labels: {
        formatter: (value: number) =>
          new Intl.NumberFormat("en-SG", {
            style: "currency",
            currency: "SGD",
          }).format(value),
      },
    },
    grid: {
      padding: {
        left: 90,
        right: 90,
      },
    },
  };

  const brushOptions = {
    chart: {
      id: "brush-chart",
      brush: {
        target: "target-chart",
        enabled: true,
        autoScaleYaxis: true,
      },
      selection: {
        enabled: true,
        xaxis: {
          min: subMonths(latestMonth, 24).getTime(),
          max: latestMonth.getTime(),
        },
      },
    },
    colors: CHART_COLOURS,
    xaxis: {
      type: "datetime" as "datetime",
      categories: months.map((month) => new Date(month).getTime()),
      max: latestMonth.getTime(),
    },
    yaxis: {
      tickAmount: 1,
    },
    legend: { show: false },
  };

  const series = createSeries(premiumMap, months);

  return (
    <section>
      <ApexChart
        options={chartOptions}
        series={series}
        type="line"
        width="100%"
        height={400}
      />
      <ApexChart
        options={brushOptions}
        series={series}
        type="area"
        width="100%"
        height={150}
      />
    </section>
  );
};
