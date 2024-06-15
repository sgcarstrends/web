"use client";

import { Fragment } from "react";
import { useSetAtom } from "jotai";
import { showCategoriesAtom } from "@/atoms/coeAtom";
import { Checkbox } from "@/components/ui/checkbox";

const EXCLUDED_CATEGORIES = ["Category C", "Category D"];

export const ShowHideCOECategories = () => {
  const setCategories = useSetAtom(showCategoriesAtom);

  return (
    <div className="flex flex-col items-center">
      <div className="prose">
        <h3>Excluded Categories</h3>
      </div>
      <div className="flex items-center gap-x-4">
        {EXCLUDED_CATEGORIES.map((category) => {
          return (
            <Fragment key={category}>
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
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};
