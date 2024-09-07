"use client";

import useStore from "@/app/store";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  category: string;
  description: string;
  canFilter?: boolean;
}

export const CategoryInfo = ({
  icon: Icon,
  category,
  description,
  canFilter = true,
}: Props) => {
  const categories = useStore((state) => state.categories);
  const updateCategories = useStore((state) => state.updateCategories);

  const handleFilterCategories = () => {
    if (canFilter) {
      updateCategories(category);
    }
  };

  return (
    <div
      className={cn(
        "mb-4 flex cursor-not-allowed items-center gap-x-2 rounded-lg border border-transparent p-2",
        {
          "cursor-pointer": canFilter,
          "border-primary": categories[category],
        },
      )}
      onClick={handleFilterCategories}
    >
      <Icon className="h-6 w-6" />
      <div>
        <h4 className="font-semibold">{category}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
