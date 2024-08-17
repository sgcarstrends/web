import Link from "next/link";
import { Metadata } from "next";
import { WebSite, WithContext } from "schema-dts";
import { CarTreeMap } from "@/app/components/CarTreeMap";
import { DataTable } from "@/app/components/DataTable";
import { MonthSelect } from "@/app/components/MonthSelect";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { API_URL, EXCLUSION_LIST, SITE_URL } from "@/config";
import { Car, LatestMonth } from "@/types";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { fetchApi } from "@/utils/fetchApi";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";

interface Props {
  params: { type: string };
  searchParams?: { [key: string]: string };
}

export const generateMetadata = async ({
  params,
  searchParams,
}: Props): Promise<Metadata> => {
  const { type } = params;
  let month = searchParams?.month;

  if (!month) {
    const latestMonth = await fetchApi<LatestMonth>(`${API_URL}/months/latest`);
    month = latestMonth.cars;
  }

  const images = `${SITE_URL}/api/og?type=${type}&month=${month}`;

  return {
    title: capitaliseWords(type),
    description: `Car registration for ${type} fuel type in Singapore for the month of ${formatDateToMonthYear(month)}.`,
    openGraph: { images },
    twitter: { images },
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

export const generateStaticParams = () =>
  Object.keys(tabItems).map((key) => ({
    type: key,
  }));

const CarsByFuelTypePage = async ({ params, searchParams }: Props) => {
  const { type } = params;

  const cars = await fetchApi<Car[]>(`${API_URL}/cars/${type}`, {
    next: { tags: ["cars"] },
  });
  const [months, latestMonth] = await Promise.all([
    fetchApi<string[]>(`${API_URL}/months`, { next: { tags: ["cars"] } }),
    fetchApi<LatestMonth>(`${API_URL}/months/latest`, {
      next: { tags: ["cars"] },
    }),
  ]);

  const totals = new Map();
  cars.forEach(({ make, number }) => {
    if (totals.has(make)) {
      totals.set(make, (totals.get(make) || 0) + number);
    } else {
      totals.set(make, number);
    }
  });

  const filteredCars = cars.filter(
    ({ make, number }) => !EXCLUSION_LIST.includes(make) && number > 0,
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
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-end gap-x-2">
            <Typography.H1>{type.toUpperCase()}</Typography.H1>
            <Typography.Lead>Cars</Typography.Lead>
          </div>
          <MonthSelect months={months} defaultMonth={latestMonth.cars} />
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <CarTreeMap data={filteredCars} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable data={filteredCars} fuelType={type} />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CarsByFuelTypePage;
