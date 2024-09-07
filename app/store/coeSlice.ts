import type { StateCreator } from "zustand";

type Category = Record<string, boolean>;

export type CoeSlice = {
  categories: Category;
};

export type COEAction = {
  updateCategories: (category: string) => void;
};

const defaultCategories: Category = {
  "Category A": true,
  "Category B": true,
  "Category C": false,
  "Category D": false,
  "Category E": true,
};

export const createCoeSlice: StateCreator<CoeSlice & COEAction> = (set) => ({
  categories: defaultCategories,
  updateCategories: (category) =>
    set(({ categories }) => ({
      categories: {
        ...categories,
        [category]: !categories[category],
      },
    })),
});
