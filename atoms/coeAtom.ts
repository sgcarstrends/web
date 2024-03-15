import { atomWithStorage } from "jotai/utils";

export const showCategoriesAtom = atomWithStorage<Record<string, boolean>>(
  "showCategories",
  {
    "Category A": true,
    "Category B": true,
    "Category C": false,
    "Category D": false,
    "Category E": true,
  },
);
