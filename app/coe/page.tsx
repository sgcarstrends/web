import { HistoricalResult } from "@/components/HistoricalResult";
import { MonthlyResult } from "@/components/MonthlyResult";
import { API_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { COEResult } from "@/types";

export const runtime = "edge";

const COEPage = async () => {
  const fetchHistoricalResult = fetchApi<COEResult[]>(`${API_URL}/coe`);
  const fetchMonthlyResult = fetchApi<COEResult[]>(`${API_URL}/coe/latest`);

  let [historicalResults, monthlyResults] = await Promise.all([
    fetchHistoricalResult,
    fetchMonthlyResult,
  ]);

  const biddingRounds = [
    ...new Set(monthlyResults.map(({ bidding_no }) => bidding_no)),
  ];

  const filterByBiddingRounds = (biddingRound: string) =>
    monthlyResults.filter(({ bidding_no }) => bidding_no === biddingRound);

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-y-8">
      <HistoricalResult data={historicalResults} />
      {biddingRounds.map((round) => {
        return (
          <MonthlyResult key={round} data={filterByBiddingRounds(round)} />
        );
      })}
    </div>
  );
};

export default COEPage;
