"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
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
};

export const LineChart = ({ data }: LineChartProps) => {
  return <Line data={data} />;
};
