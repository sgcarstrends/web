"use client";

import { ResponsivePie } from "@nivo/pie";

export const CarPieChart = ({ data }: any) => {
  data = Object.entries(data).map(([key, value]) => {
    return {
      id: key,
      label: key,
      value,
    };
  });

  return (
    <div className="h-[300px]">
      <ResponsivePie
        data={data}
        margin={{ top: 40, bottom: 40 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: "tableau10" }}
        arcLinkLabelsSkipAngle={1}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["brighter", 5]],
        }}
      />
    </div>
  );
};
