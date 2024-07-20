import { Metadata } from "next";
import Link from "next/link";
import { WebSite, WithContext } from "schema-dts";
import { CarTreeMap } from "@/app/components/CarTreeMap";
import { DataTable } from "@/app/components/DataTable";
import { MonthSelect } from "@/app/components/MonthSelect";
import { StructuredData } from "@/components/StructuredData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL, EXCLUSION_LIST, SITE_URL } from "@/config";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { fetchApi } from "@/utils/fetchApi";
import { Car } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Typography from "@/components/Typography";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";

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
    description: `Car registration for ${type} fuel type in Singapore for the month of ${month}.`,
    alternates: {
      canonical: `/cars/${type}`,
    },
  };
};

const tabItems: Record<string, string> = {
  petrol: "/cars/petrol",
  hybrid: "/cars/hybrid",
  electric: "/cars/electric",
  diesel: "/cars/diesel",
};

export const generateStaticParams = async () =>
  Object.keys(tabItems).map((key) => ({
    type: key,
  }));

const CarsByFuelTypePage = async ({ params, searchParams }: Props) => {
  const { type } = params;
  const month = searchParams?.month as string;

  const cars = await fetchApi<Car[]>(`${API_URL}/cars/${type}`);
  const months = [...new Set(cars.map(({ month }) => month))];

  const totals = new Map();
  cars.forEach(({ make, number }) => {
    if (totals.has(make)) {
      totals.set(make, (totals.get(make) || 0) + number);
    } else {
      totals.set(make, number);
    }
  });

  const filteredCars = cars.filter(
    ({ make }) => !EXCLUSION_LIST.includes(make),
  );

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${capitaliseWords(type)} - Singapore Motor Trends`,
    url: `${SITE_URL}/cars/${type}`,
  };

  return (
    <section>
      <StructuredData data={jsonLd} />
      <div className="flex flex-col gap-y-8">
        <UnreleasedFeature>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/cars">Cars</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{capitaliseWords(type)}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </UnreleasedFeature>
        <div className="flex justify-between">
          <div className="flex items-end gap-x-2">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              {type.toUpperCase()}
            </h1>
            <p className="text-xl text-muted-foreground">Cars</p>
          </div>
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
        <div className="h-[600px]">
          <CarTreeMap data={filteredCars} />
        </div>
        <DataTable data={filteredCars} fuelType={type} />
      </div>
    </section>
  );
};

export default CarsByFuelTypePage;
