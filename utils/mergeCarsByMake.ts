import { sortByValue, SortDirection } from "@/utils/sorting";
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
    .filter(({ count }) => count > 0)
    .reduce<Record<Car["make"], Car>>((acc, car) => {
      const { make } = car;

      if (!acc[make]) {
        acc[make] = { ...car, count: 0 };
      }

      acc[make].count += car.count;
      return acc;
    }, {});

  return sortByValue(Object.values(mergedData), {
    sortKey: "count",
    direction: SortDirection.DESC,
  });
};
