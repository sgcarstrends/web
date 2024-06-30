import { Metadata } from "next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HistoricalResult } from "@/app/components/HistoricalResult";
import { MonthlyResult } from "@/app/components/MonthlyResult";
import { API_URL, FEATURE_FLAG_RELEASED } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { COEResult } from "@/types";
import { ShowHideCOECategories } from "@/app/coe/ShowHideCOECategories";
import Link from "next/link";
import { capitaliseWords } from "@/utils/capitaliseWords";

export const metadata: Metadata = { alternates: { canonical: "/coe" } };

const COEPage = async () => {
  const fetchHistoricalResult = fetchApi<COEResult[]>(`${API_URL}/coe`);
  const fetchMonthlyResult = fetchApi<COEResult[]>(`${API_URL}/coe/latest`);

  const [historicalResults, monthlyResults] = await Promise.all([
    fetchHistoricalResult,
    fetchMonthlyResult,
  ]);

  const biddingRounds = [
    ...new Set(monthlyResults.map(({ bidding_no }) => bidding_no)),
  ];

  const filterByBiddingRounds = (biddingRound: number) =>
    monthlyResults.filter(({ bidding_no }) => bidding_no === biddingRound);

  return (
    <div className="flex flex-col gap-y-8">
      {FEATURE_FLAG_RELEASED && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>COE</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <ShowHideCOECategories />
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
