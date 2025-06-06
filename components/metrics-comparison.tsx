import { TrendingDown, TrendingUp } from "lucide-react";
import { formatPercent } from "@/utils/formatPercent";

interface TrendIndicatorProps {
  change: number;
  label: string;
}

const TrendIndicator = ({ change, label }: TrendIndicatorProps) => (
  <div className="flex items-center gap-1">
    <span
      className={`flex items-center gap-1 ${change >= 0 ? "text-green-600" : "text-red-600"}`}
    >
      {change >= 0 ? <TrendingUp /> : <TrendingDown />}
      {change >= 0 ? "+" : ""}
      {formatPercent(change, { maximumFractionDigits: 2 })}
    </span>
    <span className="text-gray-600">{label}</span>
  </div>
);

interface MetricsComparisonProps {
  current: number;
  previousMonth: number;
  previousYear: number;
}

export const MetricsComparison = ({
  current,
  previousMonth,
  previousYear,
}: MetricsComparisonProps) => {
  const monthChange = (current - previousMonth) / previousMonth;
  const yearChange = (current - previousYear) / previousYear;

  return (
    <div className="flex flex-col gap-1">
      <TrendIndicator change={monthChange} label="vs prev month" />
      <TrendIndicator change={yearChange} label="vs prev year" />
    </div>
  );
};
