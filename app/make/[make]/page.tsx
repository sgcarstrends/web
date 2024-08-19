import { MakeSelector } from "@/app/components/MakeSelector";
import { columns } from "@/app/make/[make]/columns";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { API_URL, SITE_URL } from "@/config";
import { type Car, type LatestMonth, type Make, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import type { WebSite, WithContext } from "schema-dts";

interface Props {
  params: { make: string };
  searchParams: { month: string };
}

export const generateMetadata = async ({ params, searchParams }: Props) => {
  const { make } = params;

  return {
    title: make,
    description: `Car registration for ${make} in Singapore`,
    alternates: {
      canonical: `/make/${make}`,
    },
  };
};

export const generateStaticParams = async () => {
  const makes = await fetchApi<Make[]>(`${API_URL}/make`, {
    next: { tags: [RevalidateTags.Cars] },
  });
  return makes.map((make) => ({ make }));
};

const mergeCarData = (cars: Car[]): Car[] => {
  const carsMap = new Map();
  cars.forEach((car) => {
    const key = `${car.make}|${car.fuel_type}|${car.vehicle_type}`;

    if (!carsMap.has(key)) {
      const { importer_type, ...rest } = car;
      carsMap.set(key, { ...rest, number: 0 });
    }

    carsMap.get(key).number += car.number || 0;
  });

  return Array.from(carsMap.values()).filter(({ number }) => number);
};

const CarMakePage = async ({ params, searchParams }: Props) => {
  const { make } = params;
  let { month } = searchParams;

  // TODO: Interim solution
  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(
      `${API_URL}/months/latest`,
      { next: { tags: [RevalidateTags.Cars] } },
    );
    month = latestMonth.cars;
  }

  const cars = await fetchApi<Car[]>(`${API_URL}/make/${make}?month=${month}`, {
    next: { tags: [RevalidateTags.Cars] },
  });
  const filteredCars = mergeCarData(cars);

  const makes = await fetchApi<Make[]>(`${API_URL}/cars/makes`, {
    next: { tags: [RevalidateTags.Cars] },
  });

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${make} - Singapore Motor Trends`,
    url: `${SITE_URL}/make/${make}`,
  };

  return (
    <section>
      <StructuredData data={jsonLd} />
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
          <Typography.H1>{decodeURIComponent(make)}</Typography.H1>
          <MakeSelector makes={makes} selectedMake={make} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={filteredCars} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CarMakePage;
