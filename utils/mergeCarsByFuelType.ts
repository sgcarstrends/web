import type { Car } from "@/types";

/**
 * Merges cars by make and aggregates their numbers.
 * Returns sorted array with cars having positive numbers.
 *
 * @param cars - Array of Car objects to be merged
 * @returns Sorted array of merged Car objects
 */
export const mergeCarsByFuelType = (cars: Car[]): Car[] => {
  // Early return for empty array
  if (!cars?.length) return [];

  // Use reduce instead of forEach for more functional approach
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
