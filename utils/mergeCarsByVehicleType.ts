import type { Car } from "@/types";

export const mergeCarsByVehicleType = (cars: Car[]): Car[] => {
  const filteredCars = cars.filter(({ number }) => number > 0);

  const mergedData: Record<string, Car> = {};
  filteredCars.forEach((car) => {
    const { make, number, vehicle_type } = car;
    const key = `${make}-${vehicle_type}`;

    if (!mergedData[key]) {
      mergedData[key] = { ...car, number: 0 };
    }

    mergedData[key].number += number;
  });

  return Object.values(mergedData).sort((a, b) => b.number - a.number);
};
