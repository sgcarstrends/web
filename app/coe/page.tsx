import { HistoricalResult } from "@/app/coe/_components/HistoricalResult";
import { MonthlyResult } from "@/app/coe/_components/MonthlyResult";
import { API_URL } from "@/config";
import { COEResult } from "@/types";

export const runtime = "edge";

const COEPage = async () => {
  const fetchHistoricalResult: Promise<COEResult[]> = fetch(
    `${API_URL}/coe`,
  ).then((res) => res.json());
  const fetchMonthlyResult: Promise<COEResult[]> = fetch(
    `${API_URL}/coe/latest`,
  ).then((res) => res.json());

  let [historicalResult, monthlyResult] = await Promise.all([
    fetchHistoricalResult,
    fetchMonthlyResult,
  ]);

  const filterByBiddingRounds = (biddingRound: string) =>
    monthlyResult.filter(({ bidding_no }) => bidding_no === biddingRound);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-y-8">
      <HistoricalResult data={historicalResult} />
      <MonthlyResult data={filterByBiddingRounds("1")} />
      <MonthlyResult data={filterByBiddingRounds("2")} />
    </div>
  );
};

export default COEPage;
