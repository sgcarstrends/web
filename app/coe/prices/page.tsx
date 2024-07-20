"use client";

import { Bike, Car, CircleDollarSign, Truck } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CategoryInfo } from "@/components/CategoryInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAtomValue } from "jotai";
import { showCategoriesAtom } from "@/atoms/coeAtom";

const COEPricesPage = () => {
  const categories = useAtomValue(showCategoriesAtom);
  const filteredData = data.map((item) =>
    Object.entries(item).reduce((acc: any, [key, value]) => {
      if (
        key === "month" ||
        (key.startsWith("Category") &&
          categories[`Category ${key.slice(-1)}`]) ||
        (key.startsWith("Bids") && categories[`Category ${key.slice(-1)}`])
      ) {
        acc[key] = value;
      }
      return acc;
    }, {}),
  );

  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        COE Bidding Results Dashboard (2024)
      </h2>
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="grid gap-4 lg:col-span-2 xl:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Quota Premium Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="CategoryA"
                    stroke="#8884d8"
                    name="Category A"
                  />
                  <Line
                    type="monotone"
                    dataKey="CategoryB"
                    stroke="#82ca9d"
                    name="Category B"
                  />
                  {categories["Category C"] && (
                    <Line
                      type="monotone"
                      dataKey="CategoryC"
                      stroke="#ffc658"
                      name="Category C"
                    />
                  )}
                  {categories["Category D"] && (
                    <Line
                      type="monotone"
                      dataKey="CategoryD"
                      stroke="#ff8042"
                      name="Category D"
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="CategoryE"
                    stroke="#0088FE"
                    name="Category E"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bidding Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="BidsA" fill="#8884d8" name="Category A" />
                  <Bar dataKey="BidsB" fill="#82ca9d" name="Category B" />
                  {categories["Category C"] && (
                    <Bar dataKey="BidsC" fill="#ffc658" name="Category C" />
                  )}
                  {categories["Category D"] && (
                    <Bar dataKey="BidsD" fill="#ff8042" name="Category D" />
                  )}
                  <Bar dataKey="BidsE" fill="#0088FE" name="Category E" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 lg:col-span-2 xl:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>Filter based on Category</CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryInfo
                icon={Car}
                category="Category A"
                description="Cars up to 1600cc & 97kW"
                canFilter={false}
              />
              <CategoryInfo
                icon={Car}
                category="Category B"
                description="Cars above 1600cc or 97kW"
                canFilter={false}
              />
              <CategoryInfo
                icon={Truck}
                category="Category C"
                description="Goods vehicles & buses"
              />
              <CategoryInfo
                icon={Bike}
                category="Category D"
                description="Motorcycles"
              />
              <CategoryInfo
                icon={CircleDollarSign}
                category="Category E"
                description="Open Category"
                canFilter={false}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// TODO: Dummy data for visualisation ONLY
const data = [
  {
    month: "Jan 2024",
    CategoryA: 81589,
    CategoryB: 112000,
    CategoryC: 68001,
    CategoryD: 9309,
    CategoryE: 109004,
    BidsA: 921,
    BidsB: 657,
    BidsC: 187,
    BidsD: 491,
    BidsE: 136,
  },
  {
    month: "Feb 2024",
    CategoryA: 76801,
    CategoryB: 97000,
    CategoryC: 73001,
    CategoryD: 8911,
    CategoryE: 94006,
    BidsA: 936,
    BidsB: 642,
    BidsC: 192,
    BidsD: 548,
    BidsE: 156,
  },
  {
    month: "Mar 2024",
    CategoryA: 85489,
    CategoryB: 96011,
    CategoryC: 70112,
    CategoryD: 9689,
    CategoryE: 95856,
    BidsA: 935,
    BidsB: 615,
    BidsC: 202,
    BidsD: 516,
    BidsE: 157,
  },
  {
    month: "Apr 2024",
    CategoryA: 94010,
    CategoryB: 102001,
    CategoryC: 68502,
    CategoryD: 9990,
    CategoryE: 103249,
    BidsA: 916,
    BidsB: 690,
    BidsC: 193,
    BidsD: 514,
    BidsE: 151,
  },
  {
    month: "May 2024",
    CategoryA: 92700,
    CategoryB: 105689,
    CategoryC: 72001,
    CategoryD: 9311,
    CategoryE: 105002,
    BidsA: 980,
    BidsB: 641,
    BidsC: 198,
    BidsD: 523,
    BidsE: 176,
  },
  {
    month: "Jun 2024",
    CategoryA: 90889,
    CategoryB: 102334,
    CategoryC: 69900,
    CategoryD: 9002,
    CategoryE: 100000,
    BidsA: 955,
    BidsB: 670,
    BidsC: 206,
    BidsD: 519,
    BidsE: 175,
  },
  {
    month: "Jul 2024",
    CategoryA: 91001,
    CategoryB: 100901,
    CategoryC: 70001,
    CategoryD: 8900,
    CategoryE: 100889,
    BidsA: 932,
    BidsB: 671,
    BidsC: 213,
    BidsD: 517,
    BidsE: 170,
  },
];

export default COEPricesPage;
