import { MakeSelector } from "@/app/components/MakeSelector";
import { TrendChart } from "@/app/make/[make]/TrendChart";
import { columns } from "@/app/make/[make]/columns";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { API_URL, SITE_URL } from "@/config";
import { type Car, type LatestMonth, type Make, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
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

const mergeCarData = (cars: Car[]): Omit<Car, "importer_type">[] => {
  cars = cars
    .filter(({ number }) => number)
    .map((car) => ({ ...car, month: formatDateToMonthYear(car.month) }));

  const mergedData = cars.reduce<Record<string, Car>>((acc, curr) => {
    const key = `${curr.month}-${curr.make}-${curr.fuel_type}-${curr.vehicle_type}`;

    if (!acc[key]) {
      acc[key] = { ...curr };
      delete acc[key].importer_type;
    } else {
      acc[key].number += curr.number;
    }

    return acc;
  }, {});

  return Object.values(mergedData);
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

  const cars = await fetchApi<Car[]>(`${API_URL}/make/${make}`, {
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
            <CardTitle>Historical Trends</CardTitle>
            <CardDescription>
              Past registrations for{" "}
              <span className="font-extrabold text-primary">
                {decodeURIComponent(make)}
              </span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrendChart data={filteredCars.toReversed()} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              Breakdown of the fuel &amp; vehicle types for{" "}
              <span className="font-extrabold text-primary">
                {decodeURIComponent(make)}
              </span>
            </CardDescription>
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
