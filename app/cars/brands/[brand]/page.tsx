import { TrendChart } from "@/app/cars/brands/[brand]/TrendChart";
import { columns } from "@/app/cars/brands/[brand]/columns";
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
import type { Dataset, WithContext } from "schema-dts";

interface Props {
  params: { brand: string };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  let { brand } = params;
  brand = decodeURIComponent(brand);
  const description = `${brand} historical trend`;
  const images = `/api/og?title=Historical Trend&make=${brand}`;
  const canonicalUrl = `/cars/brands/${brand}`;

  return {
    title: brand,
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
  const brands = await fetchApi<Make[]>(`${API_URL}/make`, {
    next: { tags: [RevalidateTags.Cars] },
  });
  return brands.map((brand) => ({ brand }));
};

const CarBrandPage = async ({ params }: Props) => {
  const { brand } = params;

  const [cars, makes]: [Car[], Make[]] = await Promise.all([
    await fetchApi<Car[]>(`${API_URL}/make/${brand}`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
    await fetchApi<Make[]>(`${API_URL}/cars/makes`, {
      next: { tags: [RevalidateTags.Cars] },
    }),
  ]);

  const filteredCars = mergeCarData(cars);

  const formattedMake = decodeURIComponent(brand);
  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${formattedMake} Car Registrations in Singapore`,
    description: `Historical trend and monthly breakdown of ${formattedMake} car registrations by fuel type and vehicle type in Singapore`,
    url: `${SITE_URL}/cars/brands/${brand}`,
    // TODO: Suggested by Google
    // temporalCoverage: "2016-06/2024-07",
    variableMeasured: [
      {
        "@type": "PropertyValue",
        name: "Month",
        description: "Month of registration",
      },
      {
        "@type": "PropertyValue",
        name: "Fuel Type",
        description: "Type of fuel used by the vehicle",
      },
      {
        "@type": "PropertyValue",
        name: "Vehicle Type",
        description: `Type of ${formattedMake} vehicle`,
      },
      {
        "@type": "PropertyValue",
        name: "Count",
        description: "Number of registrations",
      },
    ],
    // TODO: For future use
    // distribution: [
    //   {
    //     "@type": "DataDownload",
    //     encodingFormat: "text/html",
    //     contentUrl: `https://sgcarstrends.com/cars/${make}-trends.png`,
    //   },
    // ],
  };

  return (
    <section>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
          <Typography.H1>{decodeURIComponent(brand)}</Typography.H1>
          <MakeSelector makes={makes} selectedMake={brand} />
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

export default CarBrandPage;
