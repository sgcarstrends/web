import { TrendingUp } from "lucide-react";

export const BrandLogo = () => (
  <div className="flex items-center gap-2">
    <TrendingUp className="h-6 w-6 text-blue-600 lg:h-8 lg:w-8" />
    <span className="font-bold lg:text-xl">
      <span className="text-black">SGCars</span>
      <span className="text-blue-600">Trends</span>
    </span>
  </div>
);
