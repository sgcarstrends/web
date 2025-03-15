import { describe, expect, it } from "vitest";
import { sortByMake } from "@/utils/sortByMake";
import type { Car } from "@/types";

describe("sortByMake", () => {
  it("should sort the make in alphabetical order", () => {
    const makes: Pick<Car, "make">[] = [
      { make: "Porsche" },
      { make: "Mercedes Benz" },
      { make: "BMW" },
      { make: "Audi" },
    ];

    const sortedCarMake = makes.sort(sortByMake);

    expect(sortedCarMake).toStrictEqual([
      { make: "Audi" },
      { make: "BMW" },
      { make: "Mercedes Benz" },
      { make: "Porsche" },
    ]);
  });
});
