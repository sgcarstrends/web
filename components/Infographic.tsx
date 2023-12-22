"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ChartData, ChartOptions } from "chart.js";
import { getUniqueMonths } from "@/lib/getUniqueMonths";
// import { stringToUniqueColour } from "@/lib/stringToUniqueColour";
import { transformDataToDatasets } from "@/lib/transformDataToDatasets";
import type { Car, ChartDataset, Dataset } from "@/types";

type InfographicProps = {
  electricCars: Car[];
};

const DynamicLineChart = dynamic(() => import("../components/LineChart"));

export const Infographic = ({ electricCars }: InfographicProps) => {
  const initialDatasets: ChartDataset[] = transformDataToDatasets(
    electricCars,
  ).map((car: Dataset) => ({
    ...car,
    // borderColor: stringToUniqueColour(car.label),
    checked: car.data.some((item) => item >= 25),
  }));

  const [datasets, setDatasets] = useState(initialDatasets);

  const data: ChartData<"line"> = {
    labels: getUniqueMonths(electricCars),
    datasets: datasets.filter(({ checked }) => checked),
  };

  const options: ChartOptions<"line"> = {
    maintainAspectRatio: false,
    responsive: true,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      tooltip: {
        itemSort: (a, b) => (b.raw as number) - (a.raw as number),
        callbacks: {
          footer: (tooltipItems) => {
            let sum = 0;

            tooltipItems.forEach((tooltipItem) => {
              sum += tooltipItem.parsed.y;
            });
            return `Total registration: ${sum}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        suggestedMin: 0,
        title: {
          display: true,
          text: "No. of Registrations",
          font: {
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
      <div className="aspect-video w-screen max-w-[1920px] md:min-h-full">
        <DynamicLineChart data={data} options={options} />
      </div>
      <div className="prose">
        <h3>Vehicle Make</h3>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-6">
        {datasets.map(({ label, checked }, index) => {
          const key = `make-${label}`;

          return (
            <label
              key={key}
              htmlFor={key}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                id={key}
                value={label}
                defaultChecked={checked}
                className="rounded-xl text-gray-800 ring-2 checked:ring-gray-50"
                onChange={handleMakeChange(index)}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </>
  );
};
