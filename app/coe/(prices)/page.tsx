import { type SearchParams } from "nuqs/server";
import { TrendTable } from "@/app/coe/(prices)/TrendTable";
import { loadSearchParams } from "@/app/coe/(prices)/search-params";
import { COEPremiumChart } from "@/components/COE-premium-chart";
import { COECategories } from "@/components/COECategories";
import { StructuredData } from "@/components/StructuredData";
import Typography from "@/components/Typography";
import { LastUpdated } from "@/components/last-updated";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL, LAST_UPDATED_COE_KEY, SITE_TITLE, SITE_URL } from "@/config";
import redis from "@/config/redis";
import {
  type COEBiddingResult,
  type COEResult,
  type Month,
  RevalidateTags,
} from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

interface Props {
  searchParams: Promise<SearchParams>;
}

const title = "COE Result";
const description =
  "Explore historical Certificate of Entitlement (COE) price trends and bidding results for car registrations in Singapore.";

export const generateMetadata = async (): Promise<Metadata> => {
  // TODO: Refactor and clean up
  const results = await fetchApi<COEResult[]>(`${API_URL}/coe/latest`);
  const categories = results.reduce<Record<string, number>>(
    (category, current) => {
      category[current.vehicle_class] = current.premium;
      return category;
    },
    {},
  );

  const canonical = "/coe";
  const images = `/api/og/coe?title=COE Results&subtitle=Overview&biddingNo=2&categoryA=${categories["Category A"]}&categoryB=${categories["Category B"]}&categoryC=${categories["Category C"]}&categoryD=${categories["Category D"]}&categoryE=${categories["Category E"]}`;

  return {
    title,
    description,
    openGraph: {
      images,
      url: canonical,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images,
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical,
    },
  };
};

const COEPricesPage = async ({ searchParams }: Props) => {
  const { from, to } = await loadSearchParams(searchParams);

  const params = new URLSearchParams({ from, to });

  const [coeResults, months]: [COEResult[], Month[]] = await Promise.all([
    await fetchApi<COEResult[]>(`${API_URL}/coe?${params.toString()}`, {
      next: { tags: [RevalidateTags.COE] },
    }),
    await fetchApi<Month[]>(`${API_URL}/coe/months`),
  ]);
  const lastUpdated = await redis.get<number>(LAST_UPDATED_COE_KEY);

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
    name: title,
    description,
    url: `${SITE_URL}/coe`,
    publisher: {
      "@type": "Organization",
      name: SITE_TITLE,
      url: SITE_URL,
    },
  };

  return (
    <>
      <StructuredData data={structuredData} />
      <div className="flex flex-col gap-y-4">
        <Typography.H1>COE RESULT</Typography.H1>
        {lastUpdated && (
          <div>
            <LastUpdated lastUpdated={lastUpdated} />
          </div>
        )}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <COEPremiumChart data={data} months={months} />
          </div>
          <div className="xl:col-span-4">
            <COECategories />
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>List of historical COE prices</CardDescription>
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
