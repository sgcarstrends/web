import { HistoricalResult } from "@/components/HistoricalResult";
import { MonthlyResult } from "@/components/MonthlyResult";
import { API_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { COEResult } from "@/types";

export const runtime = "edge";

const COEPage = async () => {
  const fetchHistoricalResult = fetchApi<COEResult[]>(`${API_URL}/coe`);
  const fetchMonthlyResult = fetchApi<COEResult[]>(`${API_URL}/coe/latest`);

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
