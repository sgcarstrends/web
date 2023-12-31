"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { compareAsc, format, parseISO } from "date-fns";
import { API_URL, CHART_COLOURS } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { Car } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CarHeatmapProps {
  data: Car[];
}

export const CarHeatmap = ({ data }: CarHeatmapProps) => {
  const months: string[] = [...new Set(data.map(({ month }) => month))];
  const sortedMonth = months.map((month) => parseISO(month)).sort(compareAsc);
  const latestMonth = format(sortedMonth[sortedMonth.length - 1], "yyyy-MM");

  const [selectedMonth, setSelectedMonth] = useState(latestMonth);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchApi<Car[]>(`${API_URL}/cars/electric?month=${selectedMonth}`).then(
      (cars) => setCars(cars),
    );
  }, [selectedMonth]);

  const options = {
    chart: {
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: true,
    },
    colors: CHART_COLOURS,
    title: {
      text: `Electric Car Make Distribution for ${selectedMonth}`,
      align: "center" as "center",
    },
  };

  const series = [
    {
      data: cars
        ? cars.map(({ make, number }) => ({
            x: make,
            y: number,
          }))
        : [],
    },
  ];

  return (
    <div className="flex flex-col items-center gap-y-4">
      {cars && (
        <div className="h-[600px] w-full md:w-[600px]">
          <ApexChart
            options={options}
            series={series}
            type="treemap"
            width="100%"
            height="100%"
          />
        </div>
      )}
      <label htmlFor="months-select">
        <select
          name="months-select"
          id="months-select"
          defaultValue={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => {
            return (
              <option key={month} value={month}>
                {month}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
