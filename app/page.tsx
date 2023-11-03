import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/LineChart";
import { getCarRegistrationByMake } from "@/lib/getCarRegistrationByMake";
import { transformDataToDatasets } from "@/lib/transformDataToDatasets";
import { generateUniqueRandomHexColours } from "@/lib/generateUniqueRandomHexColours";
import { BASE_URL } from "@/config";
import { WebSite, WithContext } from "schema-dts";
import type { Car, ChartDataset, Dataset } from "@/types";

const Home = async () => {
  // TODO: Temporary solution while building a more permanent one.
  const electricVehicles: Car[] = await getCarRegistrationByMake(
    `https://raw.githubusercontent.com/ruchernchong/singapore-ev-trends/main/public/data/M03-Car_Regn_by_make.csv`,
  );

  const datasetColour: string[] =
    generateUniqueRandomHexColours(electricVehicles);
  const datasets: ChartDataset[] = transformDataToDatasets(
    electricVehicles,
  ).map((car: Dataset, i: number) => ({
    ...car,
    borderColor: datasetColour[i],
  }));

  const data: ChartData<"line"> = {
    labels: [...new Set(electricVehicles.map(({ month }) => month))],
    datasets,
  };

  const options: ChartOptions = {
    maintainAspectRatio: false,
  };

  const jsonLd: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Singapore EV Trends",
    url: BASE_URL,
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col items-center gap-8">
        <div className="prose dark:prose-invert">
          <h1>
            Singapore <br className="md:hidden" /> EV Trends
          </h1>
        </div>
        <div className="aspect-video w-full">
          <LineChart data={data} options={options} />
        </div>
      </div>
    </section>
  );
};

export default Home;
