"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { compareAsc, format, parseISO } from "date-fns";
import useSWR from "swr";
import { API_URL, CHART_COLOURS } from "@/config";
import { Car, PopularMake } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CarTreemapProps {
  data: Car[];
  popularMakes: PopularMake[];
}

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

export const CarTreemap = ({ data, popularMakes }: CarTreemapProps) => {
  const months = [...new Set(data.map(({ month }) => month))];
  const sortedMonth = months.map((month) => parseISO(month)).sort(compareAsc);
  const latestMonth = format(sortedMonth[sortedMonth.length - 1], "yyyy-MM");

  const [selectedMonth, setSelectedMonth] = useState<string>(latestMonth);
  const { data: cars } = useSWR<Car[]>(
    `${API_URL}/cars/electric?month=${selectedMonth}`,
    fetcher,
  );

  if (!cars) return;

  const filteredCars = cars.filter((car) =>
    popularMakes.some(({ make }: PopularMake) => make === car.make),
  );

  const options = {
    chart: {
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: true,
      formatter: (text: string, opts: { value: number }) =>
        `${text} - ${opts.value}`,
    },
    colors: CHART_COLOURS,
    title: {
      text: `Electric Car Make Distribution for ${selectedMonth}`,
      align: "center" as "center",
    },
    xaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  const series = [
    {
      data: filteredCars.map(({ make, number }) => ({
        x: make,
        y: number,
      })),
    },
  ];

  return (
    filteredCars && (
      <div className="flex flex-col items-center gap-y-4">
        <div className="w-full">
          <ApexChart
            options={options}
            series={series}
            type="treemap"
            width="100%"
            height={600}
          />
        </div>
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
    )
  );
};
