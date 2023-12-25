"use client";

import { use } from "react";
import dynamic from "next/dynamic";
import { API_URL } from "@/config";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface COEResult {
  _id: string;
  month: string;
  bidding_no: string;
  vehicle_class: string;
  quota: string;
  bids_success: string;
  bids_received: string;
  premium: string;
}

const MOCK_COE_RESULTS = [
  {
    _id: "65811d34b96c54983c4a4f13",
    month: "2023-11",
    bidding_no: "1",
    vehicle_class: "Category A",
    quota: "928",
    bids_success: "923",
    bids_received: "1,233",
    premium: "88020",
  },
  {
    _id: "65811d34b96c54983c4a4f14",
    month: "2023-11",
    bidding_no: "1",
    vehicle_class: "Category B",
    quota: "638",
    bids_success: "638",
    bids_received: "933",
    premium: "130100",
  },
  {
    _id: "65811d34b96c54983c4a4f15",
    month: "2023-11",
    bidding_no: "1",
    vehicle_class: "Category C",
    quota: "193",
    bids_success: "188",
    bids_received: "346",
    premium: "71001",
  },
  {
    _id: "65811d34b96c54983c4a4f16",
    month: "2023-11",
    bidding_no: "1",
    vehicle_class: "Category D",
    quota: "529",
    bids_success: "527",
    bids_received: "731",
    premium: "9858",
  },
  {
    _id: "65811d34b96c54983c4a4f17",
    month: "2023-11",
    bidding_no: "1",
    vehicle_class: "Category E",
    quota: "145",
    bids_success: "136",
    bids_received: "287",
    premium: "133388",
  },
  {
    _id: "65811d34b96c54983c4a4f13",
    month: "2023-11",
    bidding_no: "2",
    vehicle_class: "Category A",
    quota: "928",
    bids_success: "923",
    bids_received: "1,233",
    premium: "88020",
  },
  {
    _id: "65811d34b96c54983c4a4f14",
    month: "2023-11",
    bidding_no: "2",
    vehicle_class: "Category B",
    quota: "638",
    bids_success: "638",
    bids_received: "933",
    premium: "130100",
  },
  {
    _id: "65811d34b96c54983c4a4f15",
    month: "2023-11",
    bidding_no: "2",
    vehicle_class: "Category C",
    quota: "193",
    bids_success: "188",
    bids_received: "346",
    premium: "71001",
  },
  {
    _id: "65811d34b96c54983c4a4f16",
    month: "2023-11",
    bidding_no: "2",
    vehicle_class: "Category D",
    quota: "529",
    bids_success: "527",
    bids_received: "731",
    premium: "9858",
  },
  {
    _id: "65811d34b96c54983c4a4f17",
    month: "2023-11",
    bidding_no: "2",
    vehicle_class: "Category E",
    quota: "145",
    bids_success: "136",
    bids_received: "287",
    premium: "133388",
  },
  {
    _id: "65811d34b96c54983c4a4f13",
    month: "2023-12",
    bidding_no: "1",
    vehicle_class: "Category A",
    quota: "928",
    bids_success: "923",
    bids_received: "1,233",
    premium: "88020",
  },
  {
    _id: "65811d34b96c54983c4a4f14",
    month: "2023-12",
    bidding_no: "1",
    vehicle_class: "Category B",
    quota: "638",
    bids_success: "638",
    bids_received: "933",
    premium: "130100",
  },
  {
    _id: "65811d34b96c54983c4a4f15",
    month: "2023-12",
    bidding_no: "1",
    vehicle_class: "Category C",
    quota: "193",
    bids_success: "188",
    bids_received: "346",
    premium: "71001",
  },
  {
    _id: "65811d34b96c54983c4a4f16",
    month: "2023-12",
    bidding_no: "1",
    vehicle_class: "Category D",
    quota: "529",
    bids_success: "527",
    bids_received: "731",
    premium: "9858",
  },
  {
    _id: "65811d34b96c54983c4a4f17",
    month: "2023-12",
    bidding_no: "1",
    vehicle_class: "Category E",
    quota: "145",
    bids_success: "136",
    bids_received: "287",
    premium: "133388",
  },
  {
    _id: "65811d34b96c54983c4a4f13",
    month: "2023-12",
    bidding_no: "2",
    vehicle_class: "Category A",
    quota: "928",
    bids_success: "923",
    bids_received: "1,233",
    premium: "88020",
  },
  {
    _id: "65811d34b96c54983c4a4f14",
    month: "2023-12",
    bidding_no: "2",
    vehicle_class: "Category B",
    quota: "638",
    bids_success: "638",
    bids_received: "933",
    premium: "130100",
  },
  {
    _id: "65811d34b96c54983c4a4f15",
    month: "2023-12",
    bidding_no: "2",
    vehicle_class: "Category C",
    quota: "193",
    bids_success: "188",
    bids_received: "346",
    premium: "71001",
  },
  {
    _id: "65811d34b96c54983c4a4f16",
    month: "2023-12",
    bidding_no: "2",
    vehicle_class: "Category D",
    quota: "529",
    bids_success: "527",
    bids_received: "731",
    premium: "9858",
  },
  {
    _id: "65811d34b96c54983c4a4f17",
    month: "2023-12",
    bidding_no: "2",
    vehicle_class: "Category E",
    quota: "145",
    bids_success: "136",
    bids_received: "287",
    premium: "133388",
  },
];

const COEPage = () => {
  const data: COEResult[] = use(
    fetch(`${API_URL}/coe`).then((res) => res.json()),
  );

  const categories = data.map((item) => item.vehicle_class);
  const premium = data.map((item) => parseInt(item.premium, 10));
  const bidsReceived = data.map((item) =>
    parseInt(item.bids_received.replace(/,/g, ""), 10),
  );
  const bidsSuccess = data.map((item) =>
    parseInt(item.bids_success.replace(/,/g, ""), 10),
  );
  const quotas = data.map((item) => parseInt(item.quota, 10));

  const options = {
    chart: {
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
    stroke: {
      width: [0, 0, 0, 4],
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
    <div className="mx-auto max-w-7xl">
      <ApexCharts
        options={options}
        series={series}
        type="line"
        width="100%"
        height={400}
      />
    </div>
  );
};

export default COEPage;
