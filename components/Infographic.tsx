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
      <div className="min-h-screen w-full md:aspect-video md:min-h-full">
        <DynamicLineChart data={data} options={options} />
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
                id={key}
                type="checkbox"
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
