import { KeyStatistics } from "@/app/components/KeyStatistics";
import { Top5CarMakesByYear } from "@/app/components/Top5CarMakesByYear";
import { TotalNewCarRegistrationsByYear } from "@/app/components/TotalNewCarRegistrationsByYear";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import { SITE_TITLE, SITE_URL } from "@/config";
import type { WebSite, WithContext } from "schema-dts";

const HomePage = () => {
  const structuredData: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_TITLE,
    url: SITE_URL,
    description:
      "Analysis of new car registration trends in Singapore. Insights on popular makes, fuel and vehicle types",
  };
  return (
    <>
      <StructuredData data={structuredData} />
      <section className="flex flex-col gap-y-8">
        <Typography.H1>Dashboard</Typography.H1>
        <UnreleasedFeature>
          <div className="flex flex-col gap-y-4">
            <TotalNewCarRegistrationsByYear data={data} />
            <KeyStatistics data={data} />
            <Top5CarMakesByYear topMakes2023={topMakes2023} />
          </div>
        </UnreleasedFeature>
      </section>
    </>
  );
};

// TODO: Dummy data for visualisation ONLY
const data = [
  { year: 2013, total: 22472 },
  { year: 2014, total: 28932 },
  { year: 2015, total: 57589 },
  { year: 2016, total: 87504 },
  { year: 2017, total: 91922 },
  { year: 2018, total: 80281 },
  { year: 2019, total: 72344 },
  { year: 2020, total: 44465 },
  { year: 2021, total: 45442 },
  { year: 2022, total: 30939 },
  { year: 2023, total: 30225 },
];

// TODO: Dummy data for visualisation ONLY
const topMakes2023 = [
  { make: "BYD", value: 1416 },
  { make: "Toyota", value: 7248 },
  { make: "BMW", value: 3436 },
  { make: "Mercedes Benz", value: 4317 },
  { make: "Honda", value: 2631 },
];

export default HomePage;
