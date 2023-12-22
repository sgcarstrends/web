import React from "react";
import { mdiCarElectric, mdiChartBellCurve, mdiGasStation } from "@mdi/js";
import { Tabs } from "@/app/_components/Tabs";
import { Infographic } from "@/components/Infographic";
import { API_URL, BASE_URL, EXCLUSION_LIST } from "@/config";
import { sortByMake } from "@/lib/sortByMake";
import type { Car } from "@/types";
import { WebSite, WithContext } from "schema-dts";

const Home = async () => {
  const electricCars: Car[] = await fetch(API_URL, { cache: "no-store" }).then(
    (res) => res.json(),
  );

  const filteredElectricCars: Car[] = electricCars
    .sort(sortByMake)
    .filter(({ make }) => !EXCLUSION_LIST.includes(make));

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Singapore EV Trends",
    url: BASE_URL,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-center gap-8">
        <div className="prose flex text-center">
          <h1>Singapore EV Trends</h1>
        </div>
        <Tabs
          tabItems={[
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
            // {
            //   title: "COE",
            //   href: "/coe",
            //   icon: mdiChartBellCurve,
            // },
          ]}
        />
        <Infographic electricCars={filteredElectricCars} />
      </div>
    </section>
  );
};

export default Home;
