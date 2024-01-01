"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { compareAsc, format, parseISO } from "date-fns";
import { API_URL, CHART_COLOURS } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { Car } from "@/types";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CarTreemapProps {
  data: Car[];
  popularMakes: any;
}

export const CarTreemap = ({ data, popularMakes }: CarTreemapProps) => {
  const months = [...new Set(data.map(({ month }) => month))];
  const sortedMonth = months.map((month) => parseISO(month)).sort(compareAsc);
  const latestMonth = format(sortedMonth[sortedMonth.length - 1], "yyyy-MM");

  const [selectedMonth, setSelectedMonth] = useState<string>(latestMonth);
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchApi<Car[]>(`${API_URL}/cars/electric?month=${selectedMonth}`).then(
      (cars) => setCars(cars),
    );
  }, [selectedMonth]);

  const filteredCars = useMemo(
    () =>
      cars.filter((car) =>
        popularMakes.some(({ make }: Pick<Car, "make">) => make === car.make),
      ),
    [cars, popularMakes],
  );

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
      data: filteredCars.map(({ make, number }) => ({
        x: make,
        y: number,
      })),
    },
  ];

  return (
    filteredCars && (
      <div className="flex flex-col items-center gap-y-4">
        <div className="h-[600px] w-full md:w-[600px]">
          <ApexChart
            options={options}
            series={series}
            type="treemap"
            width="100%"
            height="100%"
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
