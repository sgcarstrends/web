"use client";

import { Fragment, useState } from "react";
import { LineChart } from "@/components/LineChart";
import { ChartData, ChartOptions } from "chart.js";
import { stringToUniqueColour } from "@/lib/stringToUniqueColour";
import { transformDataToDatasets } from "@/lib/transformDataToDatasets";
import type { Car, ChartDataset, Dataset } from "@/types";

type InfographicProps = {
  electricCars: Car[];
};

export const Infographic = ({ electricCars }: InfographicProps) => {
  const initialDatasets: ChartDataset[] = transformDataToDatasets(
    electricCars,
  ).map((car: Dataset) => ({
    ...car,
    borderColor: stringToUniqueColour(car.label),
    checked: car.data.some((item) => item >= 10),
  }));

  const [datasets, setDatasets] = useState(initialDatasets);

  const data: ChartData<"line"> = {
    labels: [...new Set(electricCars.map(({ month }) => month))],
    datasets: datasets.filter(({ checked }) => checked),
  };

  const options: ChartOptions = {
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "No. of Registration",
          font: {
            size: 16,
            weight: "bold",
          },
        },
      },
    },
  };

  const handleMakeChange = (index: number) => () => {
    const newDatasets = [...datasets];
    newDatasets[index].checked = !datasets[index].checked;
    setDatasets(newDatasets);
  };

  return (
    <>
      <div className="min-h-screen w-full md:aspect-video md:min-h-full">
        <LineChart data={data} options={options} />
      </div>
      <div className="prose dark:prose-invert">
        <h3>Make</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {datasets.map(({ label, checked }, index) => {
          const key = `make-${label}`;

          return (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={key}
                value={label}
                defaultChecked={checked}
                onChange={handleMakeChange(index)}
              />
              <label htmlFor={key}>{label}</label>
            </div>
          );
        })}
      </div>
    </>
  );
};
