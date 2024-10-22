import Link from "next/link";
import { MakeSelector } from "@/app/components/MakeSelector";
import { TrendChart } from "@/app/make/[make]/TrendChart";
import { columns } from "@/app/make/[make]/columns";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

type Params = Promise<{ [slug: string]: string }>;

export const generateMetadata = async (props: {
  params: Params;
}): Promise<Metadata> => {
  const params = await props.params;
  let { make } = params;
  make = decodeURIComponent(make);
  const description = `${make} historical trend`;
  const images = `/api/og?title=Historical Trend&make=${make}`;
  const canonicalUrl = `/make/${make}`;

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

  const getCars = await fetchApi<Car[]>(`${API_URL}/make/${make}`, {
    next: { tags: [RevalidateTags.Cars] },
  });
  const getMakes = await fetchApi<Make[]>(`${API_URL}/cars/makes`, {
    next: { tags: [RevalidateTags.Cars] },
  });

  const [cars, makes] = (await Promise.all([getCars, getMakes])) as [
    Car[],
    Make[],
  ];

  const filteredCars = mergeCarData(cars);

  const formattedMake = decodeURIComponent(make);
  const structuredData: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `${formattedMake} Car Registrations in Singapore`,
    description: `Historical trend and monthly breakdown of ${formattedMake} car registrations by fuel type and vehicle type in Singapore`,
    url: `${SITE_URL}/make/${make}`,
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
        <UnreleasedFeature>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbItem>Make</BreadcrumbItem>
              <BreadcrumbSeparator>/</BreadcrumbSeparator>
              <BreadcrumbPage>{decodeURIComponent(make)}</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </UnreleasedFeature>
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
