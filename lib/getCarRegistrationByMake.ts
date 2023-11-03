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

  const carRegistrationByMake = d3.csvParse(csvContent);

  const electricCars: Car[] = carRegistrationByMake
    .filter(
      ({ fuel_type, number }) =>
        fuel_type === FUEL_TYPE.ELECTRIC && +number !== 0,
    )
    .reduce((result: Car[], { month, make, fuel_type, number }) => {
      const existingCar = result.find(
        (car) => car.month === month && car.make === make,
      );

      if (existingCar) {
        existingCar.number += Number(number);
      } else {
        result.push({
          month,
          make,
          fuel_type,
          number: Number(number),
        });
      }

      return result;
    }, [])
    .map((car) => ({ ...car, number: +car.number }))
    .sort(sortByMake);

  console.table(electricCars);

  return electricCars;
};
