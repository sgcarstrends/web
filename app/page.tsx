import React from "react";
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
        <Infographic electricCars={filteredElectricCars} />
      </div>
    </section>
  );
};

export default Home;
