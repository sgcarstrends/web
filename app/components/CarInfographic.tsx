import { ChartDataset } from "@/types";
import { BarDatum, ResponsiveBar } from "@nivo/bar";

interface CarInfographicProps {
  datasets: ChartDataset[] | BarDatum[];
}

export const CarInfographic = ({ datasets }: CarInfographicProps) => {
  const series = datasets.filter(({ checked }) => checked) as BarDatum[];

  return <ResponsiveBar data={series} keys={[]} />;
};
