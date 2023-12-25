import { HistoricalResult } from "@/app/coe/_components/HistoricalResult";
import { MonthlyResult } from "@/app/coe/_components/MonthlyResult";
import { API_URL } from "@/config";
import { COEResult } from "@/types";

const COEPage = async () => {
  const fetchHistoricalResult: Promise<COEResult[]> = fetch(
    `${API_URL}/coe`,
  ).then((res) => res.json());
  const fetchMonthlyResult: Promise<COEResult[]> = fetch(
    `${API_URL}/coe/latest`,
  ).then((res) => res.json());

  const [historicalResult, monthlyResult] = await Promise.all([
    fetchHistoricalResult,
    fetchMonthlyResult,
  ]);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-y-8">
      <HistoricalResult data={historicalResult} />
      <MonthlyResult data={monthlyResult} />
    </div>
  );
};

export default COEPage;
