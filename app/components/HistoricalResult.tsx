"use client";
import dynamic from "next/dynamic";
import { useAtomValue } from "jotai";
import { format, parse, subMonths } from "date-fns";
import { showCategoriesAtom } from "@/atoms/coeAtom";
import { CHART_COLOURS } from "@/config";
import { COEResult } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface QuotaPremium {
  [key: string]: { [key: string]: number };
}

interface HistoricalResultProps {
  data: COEResult[];
}

export const HistoricalResult = ({ data }: HistoricalResultProps) => {
  const categories = useAtomValue(showCategoriesAtom);
  const filteredData = data.filter((item) => categories[item.vehicle_class]);

  const processCOEData = (data: COEResult[]) => {
    const quotaPremiumMap: QuotaPremium = {};
    const monthsSet = new Set<string>();

    filteredData.forEach(({ month, premium, vehicle_class }) => {
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

  const createSeries = (premiumMap: QuotaPremium, months: string[]) =>
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
    // TODO: Update annotations in a dynamic manner
    annotations: {
      xaxis: [
        {
          x: new Date("8 May 2023").getTime(),
          strokeDashArray: 0,
          borderColor: "#775DD0",
          label: {
            borderColor: "#775DD0",
            style: { color: "#ffffff", background: "#775DD0" },
            text: "MOT introduces Supply Smoothening Measure",
          },
        },
        {
          x: new Date("3 Nov 2023").getTime(),
          strokeDashArray: 0,
          borderColor: "#775DD0",
          label: {
            borderColor: "#775DD0",
            style: { color: "#ffffff", background: "#775DD0" },
            text: "Further increase to CAT A and B quotas",
          },
        },
      ],
    },
    colors: CHART_COLOURS,
    stroke: { curve: "smooth" as "smooth", width: 3 },
    dataLabels: { enabled: false },
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
            maximumFractionDigits: 0,
          }).format(value),
        align: "left" as "left",
      },
      floating: true,
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
      show: false,
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
