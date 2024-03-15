"use client";
import dynamic from "next/dynamic";
import { useAtomValue } from "jotai";
import { showCategoriesAtom } from "@/atoms/coeAtom";
import { CHART_COLOURS } from "@/config";
import { COEResult } from "@/types";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthlyResultProps {
  data: COEResult[];
}

export const MonthlyResult = ({ data }: MonthlyResultProps) => {
  const categories = useAtomValue(showCategoriesAtom);
  const filteredData = data.filter((item) => categories[item.vehicle_class]);

  const month = [...new Set(filteredData.map(({ month }) => month))];
  const uniqueNumberOfBiddingExercise = [
    ...new Set(filteredData.map(({ bidding_no }) => bidding_no)),
  ];
  const chartCategories = filteredData.map((item) => item.vehicle_class);
  const premium = filteredData.map((item) => parseInt(item.premium, 10));
  const bidsReceived = filteredData.map((item) =>
    parseInt(item.bids_received.replace(/,/g, ""), 10),
  );
  const bidsSuccess = filteredData.map((item) =>
    parseInt(item.bids_success.replace(/,/g, ""), 10),
  );
  const quotas = filteredData.map((item) => parseInt(item.quota, 10));

  const graphTitle = ({
    month,
    biddingExercise,
  }: {
    month: string;
    biddingExercise: string;
  }): string => {
    const BIDDING_EXERCISE: Record<string, string> = {
      1: "First Bidding Exercise",
      2: "Second Bidding Exercise",
    };

    return `COE Result for the ${BIDDING_EXERCISE[biddingExercise]} in ${month}`;
  };

  const options = {
    chart: {
      id: `monthly-result`,
      group: "monthly-result",
      stacked: false,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [3],
      // enabled: true,
      formatter: (value: number, option: any) => {
        if (option.seriesIndex === 3) {
          return new Intl.NumberFormat("en-SG", {
            style: "currency",
            currency: "SGD",
          }).format(value);
        }

        return value;
      },
    },
    // plotOptions: {
    //   bar: {
    //     dataLabels: {
    //       position: "center",
    //     },
    //   },
    // },
    stroke: { curve: "smooth" as "smooth", width: [0, 0, 0, 4] },
    colors: CHART_COLOURS,
    title: {
      text: graphTitle({
        month: month[0],
        biddingExercise: uniqueNumberOfBiddingExercise[0],
      }),
      align: "center" as "center",
    },
    xaxis: {
      categories: chartCategories,
    },
    yaxis: [
      {
        show: false,
        seriesName: "Quotas",
      },
      { show: false, seriesName: "Quotas" },
      { show: false, seriesName: "Quotas" },
      {
        opposite: true,
        labels: {
          formatter: (value: number) =>
            new Intl.NumberFormat("en-SG", {
              style: "currency",
              currency: "SGD",
              maximumFractionDigits: 0,
            }).format(value),
          align: "right" as "right",
        },
        floating: true,
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const series = [
    {
      name: "Bids Received",
      group: "bids",
      type: "column",
      data: bidsReceived,
    },
    {
      name: "Bids Success",
      group: "bids",
      type: "column",
      data: bidsSuccess,
    },
    {
      name: "Quotas",
      group: "quotas",
      type: "column",
      data: quotas,
    },
    {
      name: "Premium",
      group: "premium",
      type: "line",
      data: premium,
    },
  ];

  return (
    <ApexCharts
      options={options}
      series={series}
      type="line"
      width="100%"
      height={400}
    />
  );
};
