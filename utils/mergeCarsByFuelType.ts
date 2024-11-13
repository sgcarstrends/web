import type { Car } from "@/types";

export const mergeCarsByFuelType = (cars: Car[]): Car[] => {
  const filteredCars = cars.filter(({ number }) => number > 0);

  const mergedData: Record<string, Car> = {};
  filteredCars.forEach((car) => {
    const { make, number } = car;

    if (!mergedData[make]) {
      mergedData[make] = { ...car, number: 0 };
    }

    mergedData[make].number += number;
  });

  return Object.values(mergedData).sort((a, b) => b.number - a.number);
};
