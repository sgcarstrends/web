import { generateUniqueRandomHexColours } from "@/lib/generateUniqueRandomHexColours";

describe("generateUniqueRandomHexColours", () => {
  test("should generate a set of unique and random colours in hex value", () => {
    const items = [1, 2, 3, 4, 5];
    expect(generateUniqueRandomHexColours(items)).toHaveLength(items.length);
  });
});
