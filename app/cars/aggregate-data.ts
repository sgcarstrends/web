import type { Car } from "@/types";

export const aggregateData = <T extends Car>(
  data: T[],
  key: keyof T,
): Record<string, number> =>
  data.reduce<Record<string, number>>((acc, item) => {
    const value = item[key] as string;
    acc[value] = (acc[value] || 0) + (item.count || 0);
    return acc;
  }, {});
