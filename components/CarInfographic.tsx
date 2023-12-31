import dynamic from "next/dynamic";
import { parse, subMonths } from "date-fns";
import { CHART_COLOURS } from "@/config";
import { ChartDataset } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CarInfographicProps {
  datasets: ChartDataset[];
  categories: string[];
}

export const CarInfographic = ({
  datasets,
  categories,
}: CarInfographicProps) => {
  const latestMonth = parse(
    categories[categories.length - 1],
    "yyyy-MM",
    new Date(),
  );

  const grid = {
    padding: {
      left: 90,
      right: 90,
    },
  };

  const chartOptions = {
    chart: {
      id: "target-chart",
      toolbar: {
        autoSelected: "pan" as "pan",
        show: false,
      },
    },
    dataLabels: { enabled: false },
    colors: CHART_COLOURS,
    title: {
      text: "Trend of registered electric cars in the last 12 months",
      align: "center" as "center",
    },
    xaxis: {
      type: "datetime" as "datetime",
      categories,
    },
    yaxis: {
      title: {
        text: "Number of Registrations",
      },
    },
    tooltip: {
      intersect: false,
      shared: true,
      x: {
        format: "MMM yyyy",
      },
    },
    grid,
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
          min: subMonths(latestMonth, 6).getTime(),
          max: latestMonth.getTime(),
        },
      },
    },
    colors: CHART_COLOURS,
    xaxis: {
      type: "datetime" as "datetime",
      categories,
      max: latestMonth.getTime(),
    },
    yaxis: {
      tickAmount: 1,
    },
    legend: { show: false },
  };

  const series = datasets.filter(({ checked }) => checked);

  return (
    <>
      <ApexChart
        options={chartOptions}
        series={series}
        type="bar"
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
    </>
  );
};
