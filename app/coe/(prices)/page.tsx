import { TrendTable } from "@/app/coe/(prices)/TrendTable";
import { COECategories } from "@/components/COECategories";
import { COEPremiumChart } from "@/components/COEPremiumChart";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL, SITE_URL } from "@/config";
import { type COEBiddingResult, type COEResult, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

export const generateMetadata = async (): Promise<Metadata> => {
  const pageUrl = "/coe";

  return {
    title: "COE Dashboard",
    description: "COE bidding results and historical trends",
    openGraph: { url: pageUrl },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: pageUrl,
    },
  };
};

const COEPricesPage = async () => {
  const params = new URLSearchParams();
  params.append("sort", "month");
  params.append("orderBy", "asc");
  const queryString = params.toString();

  const coeResults = await fetchApi<COEResult[]>(
    `${API_URL}/coe?${queryString}`,
    { next: { tags: [RevalidateTags.COE] } },
  );

  const groupedData = coeResults.reduce<COEBiddingResult[]>(
    (acc: any, item) => {
      const key = `${item.month}-${item.bidding_no}`;

      if (!acc[key]) {
        acc[key] = {
          month: item.month,
          biddingNo: item.bidding_no,
        };
      }
      acc[key][item.vehicle_class] = item.premium;

      return acc;
    },
    [],
  );

  const data: COEBiddingResult[] = Object.values(groupedData);

  const structuredData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "COE Dashboard",
    description: "COE bidding results and historical trends",
    url: `${SITE_URL}/car`,
    author: {
      "@type": "Organization",
      name: "SGCarsTrends",
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-y-8">
        <Typography.H1>COE Results</Typography.H1>
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="grid grid-cols-1 gap-4 lg:col-span-8">
            <COEPremiumChart data={data} />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:col-span-4">
            <COECategories />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Showing the last 12 months of historical trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TrendTable coeResults={coeResults} />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default COEPricesPage;
