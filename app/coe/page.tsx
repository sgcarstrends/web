"use client";
import { Metadata } from "next";
import useSWR from "swr";
import { HistoricalResult } from "@/app/components/HistoricalResult";
import { MonthlyResult } from "@/app/components/MonthlyResult";
import { API_URL } from "@/config";
import { COEResult } from "@/types";

// export const metadata: Metadata = { alternates: { canonical: "/coe" } };

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

const COEPage = () => {
  const { data: historicalResults } = useSWR<COEResult[]>(
    `${API_URL}/coe`,
    fetcher,
  );
  const { data: monthlyResults } = useSWR<COEResult[]>(
    `${API_URL}/coe/latest`,
    fetcher,
  );

  if (!historicalResults || !monthlyResults) return null;

  const biddingRounds = [
    ...new Set(monthlyResults.map(({ bidding_no }) => bidding_no)),
  ];

  const filterByBiddingRounds = (biddingRound: string) =>
    monthlyResults.filter(({ bidding_no }) => bidding_no === biddingRound);

  return (
    <div className="flex flex-col gap-y-8">
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
