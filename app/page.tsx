import Image from "next/image";
import { LineChart } from "@/components/LineChart";
import { getCarRegistrationByMake } from "@/lib/getCarRegistrationByMake";
import { transformDataToDatasets } from "@/lib/transformDataToDatasets";
import { generateUniqueRandomHexColours } from "@/lib/generateUniqueRandomHexColours";
import { Car } from "@/types";

const Home = async () => {
  const electricVehicles = await getCarRegistrationByMake(
    `http://localhost:3000/data/M03-Car_Regn_by_make.csv`,
  );

  const datasetColour = generateUniqueRandomHexColours(electricVehicles);
  const datasets = transformDataToDatasets(electricVehicles).map(
    (ev: Car, i: number) => {
      return {
        ...ev,
        borderColor: datasetColour[i],
      };
    },
  );

  const data = {
    labels: [...new Set(electricVehicles.map(({ month }) => month))],
    datasets,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LineChart data={data} />
    </main>
  );
};

export default Home;
