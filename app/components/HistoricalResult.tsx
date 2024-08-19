"use client";

import { ResponsiveLine } from "@nivo/line";
import { parse, subMonths } from "date-fns";
import { useAtomValue } from "jotai";
import { showCategoriesAtom } from "@/atoms/coeAtom";
import type { COEResult } from "@/types";

interface QuotaPremium {
  [key: string]: { [key: string]: number };
}

interface HistoricalResultProps {
  data: COEResult[];
}

export const HistoricalResult = ({ data }: HistoricalResultProps) => {
  const categories = useAtomValue(showCategoriesAtom);
  const filteredData = data.filter((item) => categories[item.vehicle_class]);

  const processCOEData = (data: COEResult[]) => {
    const quotaPremiumMap: QuotaPremium = {};
    const monthsSet = new Set<string>();

    filteredData.forEach(({ month, premium, vehicle_class }) => {
      monthsSet.add(month);
      quotaPremiumMap[vehicle_class] = {
        ...quotaPremiumMap[vehicle_class],
        [month]: premium,
      };
    });

    return {
      premiumMap: quotaPremiumMap,
      months: Array.from(monthsSet).sort(),
    };
  };

  const createSeries = (premiumMap: QuotaPremium, months: string[]) =>
    Object.entries(premiumMap)
      .map(([vehicleClass, premiums]) => ({
        id: vehicleClass,
        data: months
          .filter((month) => {
            return parse(month, "yyyy-MM", latestMonth) >= trailing12Months;
          })
          .map((month) => ({ x: month, y: premiums[month] || 0 })),
      }))
      .sort((a, b) => a.id.localeCompare(b.id));

  const { premiumMap, months } = processCOEData(data);

  const latestMonth = parse(months[months.length - 1], "yyyy-MM", new Date());
  const trailing12Months = subMonths(latestMonth, 12);

  const series = createSeries(premiumMap, months).reverse();

  return (
    <section className="h-[600px]">
      <ResponsiveLine
        animate
        curve="natural"
        data={series}
        margin={{ top: 64, right: 8, bottom: 64, left: 64 }}
        xScale={{ type: "point" }}
        yScale={{ type: "linear", max: 200000 }}
        colors={{ scheme: "tableau10" }}
        axisLeft={{
          tickSize: 8,
          tickPadding: 4,
          tickRotation: -45,
          legend: "Premium (S$)",
          legendOffset: -56,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        axisBottom={{
          tickSize: 8,
          tickPadding: 4,
          tickRotation: -45,
          legend: "Months",
          legendOffset: 56,
          legendPosition: "middle",
          truncateTickAt: 0,
        }}
        enablePoints={false}
        enableSlices="x"
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            padding: 56,
            translateX: 0,
            translateY: 48,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 24,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
          },
        ]}
      />
    </section>
  );
};
