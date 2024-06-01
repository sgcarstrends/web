import { Metadata } from "next";
import { CarTreemap } from "@/app/components/CarTreemap";
import { Infographic } from "@/app/components/Infographic";
import {
  API_URL,
  EXCLUSION_LIST,
  POPULAR_MAKES_THRESHOLD,
  SITE_URL,
} from "@/config";
import { sortByMake } from "@/utils/sortByMake";
import { Car, PopularMake } from "@/types";
import { WebSite, WithContext } from "schema-dts";
import { fetchApi } from "@/utils/fetchApi";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const Home = async () => {
  const electricCars = await fetchApi<Car[]>(API_URL);

  const totals: Map<string, number> = new Map();
  electricCars.forEach(({ make, number }) => {
    if (totals.has(make)) {
      totals.set(make, (totals.get(make) as number) + number);
    } else {
      totals.set(make, number);
    }
  });

  const popularMakes: PopularMake[] = Array.from(totals, ([make, number]) => ({
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
    name: "Singapore Motor Trends",
    url: SITE_URL,
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
        <CarTreemap popularMakes={popularMakes} />
      </div>
    </section>
  );
};

export default Home;
