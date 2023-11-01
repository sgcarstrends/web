import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/LineChart";
import { getCarRegistrationByMake } from "@/lib/getCarRegistrationByMake";
import { transformDataToDatasets } from "@/lib/transformDataToDatasets";
import { generateUniqueRandomHexColours } from "@/lib/generateUniqueRandomHexColours";
import type { Car, ChartDataset, Dataset } from "@/types";

const Home = async () => {
  // TODO: This part here only works on local. Will need to host this file somewhere instead.
  const electricVehicles: Car[] = await getCarRegistrationByMake(
    `http://localhost:3000/data/M03-Car_Regn_by_make.csv`,
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
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Singapore EV Trends",
      },
    },
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LineChart data={data} options={options} />
    </main>
  );
};

export default Home;
