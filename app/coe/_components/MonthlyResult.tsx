"use client";

import dynamic from "next/dynamic";
import { COEResult } from "@/types";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthlyResultProps {
  data: COEResult[];
}

export const MonthlyResult = ({ data }: MonthlyResultProps) => {
  const month = [...new Set(data.map(({ month }) => month))];
  const uniqueNumberOfBiddingExercise = [
    ...new Set(data.map(({ bidding_no }) => bidding_no)),
  ];
  const categories = data.map((item) => item.vehicle_class);
  const premium = data.map((item) => parseInt(item.premium, 10));
  const bidsReceived = data.map((item) =>
    parseInt(item.bids_received.replace(/,/g, ""), 10),
  );
  const bidsSuccess = data.map((item) =>
    parseInt(item.bids_success.replace(/,/g, ""), 10),
  );
  const quotas = data.map((item) => parseInt(item.quota, 10));

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
    plotOptions: {
      bar: {
        dataLabels: {
          position: "center",
        },
      },
    },
    stroke: { curve: "smooth" as "smooth", width: [0, 0, 0, 4] },
    colors: ["#546E7A", "#D4526E", "#13D8AA", "#A5978B"],
    title: {
      text: graphTitle({
        month: month[0],
        biddingExercise: uniqueNumberOfBiddingExercise[0],
      }),
    },
    xaxis: {
      categories,
    },
    yaxis: [
      { seriesName: "Quotas", title: { text: "Number of Bids" } },
      { show: false, seriesName: "Quotas" },
      { show: false, seriesName: "Quotas" },
      {
        opposite: true,
        title: { text: "Premium" },
        labels: {
          formatter: (value: number) =>
            new Intl.NumberFormat("en-SG", {
              style: "currency",
              currency: "SGD",
            }).format(value),
        },
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
