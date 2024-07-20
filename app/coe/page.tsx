import { Metadata } from "next";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ShowHideCOECategories } from "@/app/coe/ShowHideCOECategories";
import { HistoricalResult } from "@/app/components/HistoricalResult";
import { MonthlyResult } from "@/app/components/MonthlyResult";
import { API_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { COEResult } from "@/types";
import { UnreleasedFeature } from "@/components/UnreleasedFeature";

export const metadata: Metadata = { alternates: { canonical: "/coe" } };

const COEPage = async () => {
  const fetchHistoricalResult = fetchApi<COEResult[]>(`${API_URL}/coe`);
  const fetchMonthlyResult = fetchApi<COEResult[]>(`${API_URL}/coe/latest`);
  const fetchLatestMonth = fetchApi<Record<string, string>>(
    `${API_URL}/months/latest`,
  );

  const [historicalResults, monthlyResults, latestMonth] = await Promise.all([
    fetchHistoricalResult,
    fetchMonthlyResult,
    fetchLatestMonth,
  ]);

  const biddingRounds = [
    ...new Set(monthlyResults.map(({ bidding_no }) => bidding_no)),
  ];

  const filterByBiddingRounds = (biddingRound: number) =>
    monthlyResults.filter(({ bidding_no }) => bidding_no === biddingRound);

  return (
    <div className="flex flex-col gap-y-8">
      <UnreleasedFeature>
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
      </UnreleasedFeature>
      <ShowHideCOECategories />
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Prices
      </h2>
      <HistoricalResult data={historicalResults} />
      <div className="flex items-center gap-x-2">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Bidding Results
        </h2>
        <p className="text-xl text-muted-foreground">For {latestMonth.coe}</p>
      </div>
      {biddingRounds.map((round) => {
        const pr = new Intl.PluralRules("en-SG", { type: "ordinal" });

        const suffixes = new Map([
          ["one", "st"],
          ["two", "nd"],
          ["few", "rd"],
          ["other", "th"],
        ]);

        const formatOrdinals = (n: number) => {
          const rule = pr.select(n);
          const suffix = suffixes.get(rule);
          return `${n}${suffix}`;
        };

        return (
          <div key={round}>
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
              {formatOrdinals(round)} Bidding Round
            </h3>
            <MonthlyResult key={round} data={filterByBiddingRounds(round)} />
          </div>
        );
      })}
    </div>
  );
};

export default COEPage;
