"use client";
import { useSetAtom } from "jotai";
import { showCategoriesAtom } from "@/atoms/coeAtom";

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
            <label
              key={category}
              htmlFor={category}
              className="flex items-center gap-x-2"
            >
              <input
                type="checkbox"
                name={category}
                id={category}
                value={category}
                defaultChecked={EXCLUDED_CATEGORIES.includes(category)}
                onChange={(e) => {
                  setCategories((category) => ({
                    ...category,
                    [e.target.value]: !e.target.checked,
                  }));
                }}
              />
              {category}
            </label>
          );
        })}
      </div>
    </div>
  );
};
