import { Metadata } from "next";
import { CarTreeMap } from "@/app/components/CarTreeMap";
import {
  API_URL,
  EXCLUSION_LIST,
  POPULAR_MAKES_THRESHOLD,
  SITE_URL,
} from "@/config";
import { sortByMake } from "@/utils/sortByMake";
import { Car, PopularMake, TabItem } from "@/types";
import { WebSite, WithContext } from "schema-dts";
import { fetchApi } from "@/utils/fetchApi";
import { DataTable } from "@/app/components/DataTable";
import { MonthSelect } from "@/app/components/MonthSelect";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { capitaliseWords } from "@/utils/capitaliseWords";

interface Props {
  params: { type: string };
  searchParams?: { [key: string]: string | string[] };
}

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { type } = params;
  const month = searchParams?.month as string;

  return {
    title: capitaliseWords(type),
    description: `Data trends for ${type} cars in Singapore for ${month}.`,
    alternates: {
      canonical: `/cars/${type}`,
    },
  };
};

const tabItems: Record<string, string> = {
  petrol: "/cars/petrol",
  // hybrid: "/cars/hybrid",
  electric: "/cars/electric",
  diesel: "/cars/diesel",
};

const CarsByFuelTypePage = async ({ params, searchParams }: Props) => {
  const { type } = params;
  const month = searchParams?.month as string;

  const cars = await fetchApi<Car[]>(`${API_URL}/cars/${type}`);
  const months = [...new Set(cars.map(({ month }) => month))];

  const totals: Map<string, number> = new Map();
  cars.forEach(({ make, number }) => {
    if (totals.has(make)) {
      totals.set(make, (totals.get(make) || 0) + number);
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

  const filteredCars: Car[] = cars
    .sort(sortByMake)
    .filter(({ make }) => !EXCLUSION_LIST.includes(make));

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${capitaliseWords(type)} - Singapore Motor Trends`,
    url: `${SITE_URL}/cars/${type}`,
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
            <h2 className="text-3xl font-bold">Passenger Cars</h2>
            <div>
              <MonthSelect months={months} selectedMonth={month} />
            </div>
          </div>
          <Tabs defaultValue={type}>
            <TabsList>
              {Object.entries(tabItems).map(([title, href]) => {
                return (
                  <Link key={title} href={href}>
                    <TabsTrigger value={title}>
                      {capitaliseWords(title)}
                    </TabsTrigger>
                  </Link>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
        <div className="h-[600px]">
          <CarTreeMap data={filteredCars} />
        </div>
        <DataTable data={filteredCars} fuelType={type} />
      </div>
    </section>
  );
};

export default CarsByFuelTypePage;
