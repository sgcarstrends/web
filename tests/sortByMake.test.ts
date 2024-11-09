import { sortByMake } from "@/utils/sortByMake";
import type { Car } from "@/types";

describe("sortByMake", () => {
  test("should sort the make in alphabetical order", () => {
    const carMake: Pick<Car, "make">[] = [
      { make: "Porsche" },
      { make: "Mercedes Benz" },
      { make: "BMW" },
      { make: "Audi" },
    ];

    const sortedCarMake = carMake.sort(sortByMake);

    expect(sortedCarMake).toStrictEqual([
      { make: "Audi" },
      { make: "BMW" },
      { make: "Mercedes Benz" },
      { make: "Porsche" },
    ]);
  });
});
