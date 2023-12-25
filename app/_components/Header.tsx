import React from "react";
import { mdiCarElectric, mdiChartBellCurve, mdiGasStation } from "@mdi/js";
import { Tabs } from "@/app/_components/Tabs";
import { TabItem } from "@/types";

const tabItems: TabItem[] = [
  {
    title: "Electric",
    href: "/",
    icon: mdiCarElectric,
  },
  {
    title: "Petrol",
    href: "/petrol",
    icon: mdiGasStation,
  },
  {
    title: "COE",
    href: "/coe",
    icon: mdiChartBellCurve,
  },
];

export const Header = () => {
  return (
    <>
      <div className="flex flex-col flex-wrap items-center px-4 py-8">
        <div className="prose flex text-center">
          <h1>Singapore EV Trends</h1>
        </div>
      </div>
      <div className="sticky top-0 z-50 bg-gray-50">
        <Tabs tabItems={tabItems} />
      </div>
    </>
  );
};
