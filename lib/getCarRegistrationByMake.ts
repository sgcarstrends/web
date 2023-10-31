import * as d3 from "d3";
import { FUEL_TYPE } from "@/config";
import type { Car } from "@/types";

export const getCarRegistrationByMake = async (filePath: string) => {
  const csvContent = await fetch(filePath).then((res) => res.text());
  const carRegistrationByMake: Car[] = d3.csvParse(csvContent, (car: Car) => ({
    ...car,
    number: +car.number,
  }));

  return carRegistrationByMake
    .filter(
      ({ fuel_type, number }) =>
        fuel_type === FUEL_TYPE.ELECTRIC && number !== 0,
    )
    .reduce((result: Car[], item: Car) => {
      const { month, make, fuel_type, vehicle_type } = item;
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
          vehicle_type,
          number: item.number,
        });
      }

      return result;
    }, []);
};
