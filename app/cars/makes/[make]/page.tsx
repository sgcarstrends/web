import { TrendChart } from "@/app/cars/makes/[make]/TrendChart";
import { columns } from "@/app/cars/makes/[make]/columns";
import { MakeSelector } from "@/app/components/MakeSelector";
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
import { API_URL, SITE_TITLE, SITE_URL } from "@/config";
import { type Car, type Make, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

type Params = Promise<{ [slug: string]: string }>;

export const generateMetadata = async (props: {
  params: Params;
}): Promise<Metadata> => {
  const params = await props.params;
  let { make } = params;
  make = decodeURIComponent(make);
  const description = `${make} historical trend`;
  const images = `/api/og?title=Historical Trend&make=${make}`;
  const canonicalUrl = `/cars/makes/${make}`;

  return {
    title: make,
    description,
    openGraph: {
      images,
      url: canonicalUrl,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      images,
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
};

export const generateStaticParams = async () => {
  const makes = await fetchApi<Make[]>(`${API_URL}/make`, {
    next: { tags: [RevalidateTags.Cars] },
  });
  return makes.map((make) => ({ make }));
};

const CarMakePage = async (props: { params: Params }) => {
  const params = await props.params;
  const { make } = params;

  const [cars, makes]: [Car[], Make[]] = await Promise.all([
    await fetchApi<Car[]>(`${API_URL}/make/${make}`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
    await fetchApi<Make[]>(`${API_URL}/cars/makes`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
  ]);

  const filteredCars = mergeCarData(cars);

  const formattedMake = decodeURIComponent(make);
  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${formattedMake} Car Registrations in Singapore`,
    description: `Historical trend and monthly breakdown of ${formattedMake} car registrations by fuel type and vehicle type in Singapore`,
    url: `${SITE_URL}/cars/makes/${make}`,
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
    },
  };

  return (
    <section>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
          <Typography.H1>{decodeURIComponent(make)}</Typography.H1>
          <MakeSelector makes={makes} selectedMake={make} />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Historical Trend</CardTitle>
            <CardDescription>Past registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <TrendChart data={filteredCars.toReversed()} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription>
              Breakdown of fuel &amp; vehicle types by month
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

export default CarMakePage;
