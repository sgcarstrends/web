import { Metadata } from "next";
import { CarTreeMap } from "@/app/components/CarTreeMap";
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
import { DataTable } from "@/app/components/DataTable";
import { MonthSelect } from "@/app/components/MonthSelect";

export const metadata: Metadata = { alternates: { canonical: "/" } };

const Home = async () => {
  const electricCars = await fetchApi<Car[]>(API_URL);
  const months = [...new Set(electricCars.map(({ month }) => month))];

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
        <div className="flex-1">
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">Electric Cars</h2>
            <div>
              <MonthSelect months={months} />
            </div>
          </div>
        </div>
        {/*<Infographic*/}
        {/*  electricCars={filteredElectricCars}*/}
        {/*  isPopularMake={popularMakes}*/}
        {/*/>*/}
        <div className="h-[600px]">
          <CarTreeMap data={filteredElectricCars} />
        </div>
        <DataTable data={filteredElectricCars} />
      </div>
    </section>
  );
};

export default Home;
