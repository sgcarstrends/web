import type { Car } from "@/types";

/**
 * Merges cars by make and aggregates their numbers.
 * Returns sorted array with cars having positive numbers.
 *
 * @param cars - Array of Car objects to be merged
 * @returns Sorted array of merged Car objects
 */
export const mergeCarsByMake = (cars: Car[]): Car[] => {
  if (!cars?.length) return [];

  const mergedData = cars
    .filter(({ number }) => number > 0)
    .reduce<Record<Car["make"], Car>>((acc, car) => {
      const { make } = car;

      if (!acc[make]) {
        acc[make] = { ...car, number: 0 };
      }

      acc[make].number += car.number;
      return acc;
    }, {});

  return Object.values(mergedData).sort((a, b) => b.number - a.number);
};
