import { stringToUniqueColour } from "@/lib/stringToUniqueColour";

describe("stringToUniqueColour", () => {
  test("should generate a hex colour from a string", () => {
    expect(stringToUniqueColour("BMW")).toContain("#");
    expect(stringToUniqueColour("BMW")).toHaveLength(7);
  });
});
