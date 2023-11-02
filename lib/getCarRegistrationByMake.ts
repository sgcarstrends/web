import * as d3 from "d3";
import { FUEL_TYPE } from "@/config";
import { sortByMake } from "@/lib/sortByMake";
import type { Car } from "@/types";

export const getCarRegistrationByMake = async (
  filePath: string,
): Promise<Car[]> => {
  const csvContent: string = await fetch(filePath, { cache: "no-store" }).then(
    (res) => res.text(),
  );
  const carRegistrationByMake: Car[] = d3.csvParse(csvContent, (car: Car) => ({
    ...car,
    number: +car.number,
  }));

  const electricCars: Car[] = carRegistrationByMake
    .filter(
      ({ fuel_type, number }) =>
        fuel_type === FUEL_TYPE.ELECTRIC && number !== 0,
    )
    .reduce((result: Car[], item: Car) => {
      const { month, make, fuel_type } = item;
      const existingItem = result.find(
        (item) => item.month === month && item.make === make,
      );

      if (existingItem) {
        existingItem.number += item.number;
      } else {
        result.push({
          month,
          make,
          fuel_type,
          number: item.number,
        });
      }

      return result;
    }, [])
    .sort(sortByMake);

  console.table(electricCars);

  return electricCars;
};
