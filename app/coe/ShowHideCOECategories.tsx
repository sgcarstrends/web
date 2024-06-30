"use client";

import { useSetAtom } from "jotai";
import { showCategoriesAtom } from "@/atoms/coeAtom";
import { Checkbox } from "@/components/ui/checkbox";

const EXCLUDED_CATEGORIES = ["Category C", "Category D"];

export const ShowHideCOECategories = () => {
  const setCategories = useSetAtom(showCategoriesAtom);

  return (
    <div className="flex flex-col">
      <div className="prose">
        <h3>Excluded Categories</h3>
      </div>
      <div className="flex flex-col">
        {EXCLUDED_CATEGORIES.map((category) => {
          return (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                value={category}
                defaultChecked={EXCLUDED_CATEGORIES.includes(category)}
                onCheckedChange={(checked) => {
                  setCategories((categories) => {
                    return {
                      ...categories,
                      [category]: !checked,
                    };
                  });
                }}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
