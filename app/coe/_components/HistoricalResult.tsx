"use client";

import dynamic from "next/dynamic";
import { format } from "date-fns";
import { COEResult } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface PremiumMap {
  [key: string]: { [key: string]: number };
}

export const runtime = "edge";

interface HistoricalResultProps {
  data: COEResult[];
}

export const HistoricalResult = ({ data }: HistoricalResultProps) => {
  const processCOEData = (data: COEResult[]) => {
    const premiumMap: PremiumMap = {};
    const monthsSet = new Set<string>();

    data.forEach(({ month, premium, vehicle_class }) => {
      monthsSet.add(month);
      premiumMap[vehicle_class] = {
        ...premiumMap[vehicle_class],
        [month]: parseInt(premium, 10),
      };
    });

    return {
      premiumMap,
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

  const options = {
    chart: {
      group: "coe",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    colors: ["#546E7A", "#D4526E", "#13D8AA", "#A5978B"],
    stroke: { width: 3 },
    dataLabels: { enabled: false },
    fill: { opacity: 0.8 },
    title: { text: "COE Result History" },
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
  };

  const series = createSeries(premiumMap, months);

  return (
    <>
      <ApexChart
        options={options}
        series={series}
        type="line"
        width="100%"
        height={400}
      />
    </>
  );
};
