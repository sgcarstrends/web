import React from "react";
import { CarHeatmap } from "@/app/_components/CarHeatmap";
import { Infographic } from "@/app/_components/Infographic";
import { API_URL, BASE_URL, EXCLUSION_LIST } from "@/config";
import { sortByMake } from "@/lib/sortByMake";
import type { Car } from "@/types";
import { WebSite, WithContext } from "schema-dts";

export const runtime = "edge";

const Home = async () => {
  const electricCars: Car[] = await fetch(API_URL, { cache: "no-store" }).then(
    (res) => res.json(),
  );

  const totals = new Map();
  electricCars.forEach((car) => {
    if (totals.has(car.make)) {
      totals.set(car.make, totals.get(car.make) + car.number);
    } else {
      totals.set(car.make, car.number);
    }
  });
  const popularMakes = Array.from(totals, ([make, number]) => ({
    make,
    number,
  }))
    .sort((a, b) => b.number - a.number)
    .slice(0, 10);

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
      <div className="flex flex-col gap-y-8">
        <Infographic
          electricCars={filteredElectricCars}
          isPopularMake={popularMakes}
        />
        <CarHeatmap data={filteredElectricCars} />
      </div>
    </section>
  );
};

export default Home;
