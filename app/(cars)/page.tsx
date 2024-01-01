import React from "react";
import { CarTreemap } from "@/components/CarTreemap";
import { Infographic } from "@/components/Infographic";
import {
  API_URL,
  BASE_URL,
  EXCLUSION_LIST,
  POPULAR_MAKES_THRESHOLD,
} from "@/config";
import { sortByMake } from "@/utils/sortByMake";
import { Car } from "@/types";
import { WebSite, WithContext } from "schema-dts";
import { fetchApi } from "@/utils/fetchApi";

export const runtime = "edge";

const Home = async () => {
  const electricCars = await fetchApi<Car[]>(API_URL, { cache: "no-store" });

  const totals: Map<string, number> = new Map();
  electricCars.forEach(({ make, number }) => {
    if (totals.has(make)) {
      totals.set(make, (totals.get(make) as number) + number);
    } else {
      totals.set(make, number);
    }
  });

  const popularMakes = Array.from(totals, ([make, number]) => ({
    make,
    number,
  }))
    .sort((a, b) => b.number - a.number)
    .slice(0, POPULAR_MAKES_THRESHOLD);

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
        <CarTreemap data={filteredElectricCars} popularMakes={popularMakes} />
      </div>
    </section>
  );
};

export default Home;
