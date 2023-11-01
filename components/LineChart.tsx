"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Colors,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
);

type LineChartProps = {
  data: ChartData<"line">;
  options?: ChartOptions;
};

export const LineChart = ({ data, options }: LineChartProps) => {
  return <Line data={data} options={options} />;
};
