"use client";

import { ResponsiveTreeMap } from "@nivo/treemap";
import { useGlobalState } from "@/context/GlobalStateContext";
import type { Car } from "@/types";

interface TreeMapProps {
  data: Car[];
}

interface Result {
  name: string;
  children: Pick<Car, "make" | "number">[];
}

export const CarTreeMap = ({ data }: TreeMapProps) => {
  const { state } = useGlobalState();
  const { selectedMonth } = state;

  data = data.filter(({ month }) => month === selectedMonth);

  const convertToTreeMapFormat = (data: any[]) => {
    const result: Result = { name: "Cars", children: [] };

    for (const item of data) {
      const { make, number } = item;
      result.children.push({ make, number });
    }

    return result;
  };

  const formattedData = convertToTreeMapFormat(data);

  return (data.length > 0 && (
    <div className="h-[600px]">
      <ResponsiveTreeMap
        data={formattedData}
        identity="make"
        value="number"
        leavesOnly={true}
        label={({ id, formattedValue }) => `${id} (${formattedValue})`}
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
        colors={{ scheme: "tableau10" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.1]],
        }}
      />
    </div>
    // TODO: Fix types
  )) as JSX.Element;
};
