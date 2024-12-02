import { TrendTable } from "@/app/(dashboard)/coe/(prices)/TrendTable";
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
import { API_URL, SITE_TITLE, SITE_URL } from "@/config";
import {
  type COEBiddingResult,
  type COEResult,
  type Month,
  RevalidateTags,
} from "@/types";
import { fetchApi } from "@/utils/fetchApi";
import type { Metadata } from "next";
import type { WebPage, WithContext } from "schema-dts";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const title = "COE Result";
const description =
  "Explore historical trends and bidding results for COE in Singapore.";

export const generateMetadata = async (): Promise<Metadata> => {
  const pageUrl = "/coe";
  // const images = "/api/og?title=COE Result";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      images: "/opengraph-image.png",
      url: pageUrl,
      siteName: SITE_TITLE,
      locale: "en_SG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      images: "/opengraph-image.png",
      site: "@sgcarstrends",
      creator: "@sgcarstrends",
    },
    alternates: {
      canonical: pageUrl,
    },
  };
};

const COEPricesPage = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;

  // Convert searchParams to a valid format for URLSearchParams
  const params = new URLSearchParams(
    Object.entries(searchParams).reduce(
      (acc: Record<string, string>, [key, value]) => {
        if (typeof value === "string") {
          acc[key] = value;
        } else if (Array.isArray(value)) {
          acc[key] = value.join(","); // Or handle arrays in any other way you prefer
        }
        return acc;
      },
      {},
    ),
  );

  params.append("sort", "month");
  params.append("orderBy", "asc");
  const queryString = params.toString();

  const [coeResults, months]: [COEResult[], Month[]] = await Promise.all([
    await fetchApi<COEResult[]>(`${API_URL}/coe?${queryString}`, {
      next: { tags: [RevalidateTags.COE] },
    }),
    await fetchApi<Month[]>(`${API_URL}/coe/months`),
  ]);

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
