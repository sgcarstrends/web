import Link from "next/link";
import { WebSite, WithContext } from "schema-dts";
import { API_URL, SITE_URL } from "@/config";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchApi } from "@/utils/fetchApi";
import type { Car, LatestMonth } from "@/types";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { MAKE } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  const makes = await fetchApi<string[]>(`${API_URL}/make`, {
    next: { tags: ["cars"] },
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
      { next: { tags: ["cars"] } },
    );
    month = latestMonth.cars;
  }

  const cars = await fetchApi<Car[]>(`${API_URL}/make/${make}?month=${month}`, {
    next: { tags: ["cars"] },
  });
  const filteredCars = mergeCarData(cars);

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
        <div className="flex items-end gap-x-2">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            {decodeURIComponent(make)}
          </h1>
          <p className="text-xl text-muted-foreground">Registrations</p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {Object.values(MAKE.TABLE.HEADERS).map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCars.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={Object.entries(MAKE.TABLE.HEADERS).length}
                      className="text-center"
                    >
                      <Typography.H4>No data available</Typography.H4>
                    </TableCell>
                  </TableRow>
                )}
                {filteredCars.map((car, index) => (
                  <TableRow
                    key={`${car.fuel_type}-${car.vehicle_type}`}
                    className="even:bg-muted"
                  >
                    <TableCell>{car.month}</TableCell>
                    <TableCell>
                      <Link
                        href={`/cars/${car.fuel_type.toLowerCase()}?month=${car.month}`}
                        className="hover:underline"
                      >
                        {car.fuel_type}
                      </Link>
                    </TableCell>
                    <TableCell>{car.vehicle_type}</TableCell>
                    <TableCell>{car.number}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CarMakePage;
