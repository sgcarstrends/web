import React from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MonthSelect } from "@/app/components/MonthSelect";
import { TabItem } from "@/types";

const tabItems: TabItem[] = [
  {
    title: "Cars",
    href: "/",
  },
  // {
  //   title: "Electric",
  //   href: "/cars/electric",
  //   icon: mdiCarElectric,
  // },
  // {
  //   title: "Petrol",
  //   href: "/petrol",
  //   icon: mdiGasStation,
  // },
  {
    title: "COE",
    href: "/coe",
  },
];

export const Header = () => {
  return (
    <div className="flex p-8">
      <Tabs defaultValue={tabItems[0].title}>
        <TabsList>
          {tabItems.map(({ title, href }) => (
            <Link key={title} href={href}>
              <TabsTrigger value={title}>{title}</TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
