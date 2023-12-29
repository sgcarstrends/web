"use client";

import { useState } from "react";
import { CarInfographic } from "@/app/_components/CarInfographic";
import { getUniqueMonths } from "@/lib/getUniqueMonths";
import { transformDataToDatasets } from "@/lib/transformDataToDatasets";
import { Car, ChartDataset } from "@/types";

interface InfographicProps {
  electricCars: Car[];
  isPopularMake: Pick<Car, "make" | "number">[];
}

export const Infographic = ({
  electricCars,
  isPopularMake,
}: InfographicProps) => {
  const initialDatasets: ChartDataset[] = transformDataToDatasets(
    electricCars,
  ).map((car: any) => ({
    ...car,
    checked: isPopularMake.some(({ make }) => make === car.name),
  }));

  const [datasets, setDatasets] = useState<ChartDataset[]>(initialDatasets);

  const categories: string[] = getUniqueMonths(electricCars);

  const handleMakeChange = (index: number) => () => {
    const newDatasets = [...datasets];
    newDatasets[index].checked = !datasets[index].checked;
    setDatasets(newDatasets);
  };

  return (
    <>
      <CarInfographic datasets={datasets} categories={categories} />
      <div className="flex w-full justify-center">
        <h3 className="text-xl font-semibold">Add/Remove Vehicle Make</h3>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-6">
        {datasets.map(({ name, checked }, index) => {
          const key = `make-${name}`;

          return (
            <label
              key={key}
              htmlFor={key}
              className="flex cursor-pointer items-center gap-2"
            >
              <input
                type="checkbox"
                id={key}
                value={name}
                defaultChecked={checked}
                className="rounded-lg text-gray-900 ring-2 ring-gray-900 checked:ring-gray-900"
                onChange={handleMakeChange(index)}
              />
              {name}
            </label>
          );
        })}
      </div>
    </>
  );
};
