import { ResponsiveBar } from "@nivo/bar";

interface CarInfographicProps {
  datasets: [];
}

export const CarInfographic = ({ datasets }: CarInfographicProps) => {
  const series = datasets.filter(({ checked }) => checked);

  return <ResponsiveBar data={series} keys={[]} />;
};
