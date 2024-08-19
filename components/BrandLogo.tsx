import { TrendingUp } from "lucide-react";

export const BrandLogo = () => (
  <div className="flex items-center gap-x-2">
    <TrendingUp className="h-4 w-4 text-blue-600 lg:h-8 lg:w-8" />
    <span className="text-sm font-bold lg:text-xl">
      <span className="text-black">SGCars</span>
      <span className="text-blue-600">Trends</span>
    </span>
  </div>
);
