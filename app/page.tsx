import type { ChartData, ChartOptions } from "chart.js";
import { LineChart } from "@/components/LineChart";
import { getCarRegistrationByMake } from "@/lib/getCarRegistrationByMake";
import { transformDataToDatasets } from "@/lib/transformDataToDatasets";
import { generateUniqueRandomHexColours } from "@/lib/generateUniqueRandomHexColours";
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

  return (
    <div className="flex flex-col items-center">
      <h1>Singapore EV Trends</h1>
      <div className="h-screen w-full">
        <LineChart data={data} options={options} />
      </div>
    </div>
  );
};

export default Home;
