import Link from "next/link";
import { Search, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { NavMenu } from "@/app/components/NavMenu";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";
import { MobileNavMenu } from "@/app/components/MobileNavMenu";

export const Header = () => {
  return (
    <header className="border-b-2 bg-white">
      <MobileNavMenu />
      <div className="container hidden items-center justify-between p-4 lg:flex">
        <nav className="flex items-center gap-x-4">
          <Link href="/" className="flex items-center gap-x-2">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">
              <span className="text-black">SGCars</span>
              <span className="text-blue-600">Trends</span>
            </span>
          </Link>
          <NavMenu />
        </nav>
        <UnreleasedFeature>
          <div className="flex items-center gap-x-4">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search..."
                className="border border-gray-300 pl-10 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </UnreleasedFeature>
      </div>
    </header>
  );
};
