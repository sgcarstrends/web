import React from "react";
import { mdiCarElectric, mdiChartBellCurve } from "@mdi/js";
import { MonthSelect } from "@/app/components/MonthSelect";
import { Tabs } from "@/app/components/Tabs";
import { TabItem } from "@/types";

const tabItems: TabItem[] = [
  {
    title: "Electric",
    href: "/",
    icon: mdiCarElectric,
  },
  // {
  //   title: "Petrol",
  //   href: "/petrol",
  //   icon: mdiGasStation,
  // },
  {
    title: "COE",
    href: "/coe",
    icon: mdiChartBellCurve,
  },
];

export const Header = () => {
  return (
    <>
      <div className="flex-1 gap-y-4 p-8">
        <div className="flex items-center justify-between gap-y-2">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <div>
            <MonthSelect />
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-50 bg-gray-50">
        <Tabs tabItems={tabItems} />
      </div>
    </>
  );
};
