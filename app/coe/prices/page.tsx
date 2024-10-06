import { TrendTable } from "@/app/coe/prices/TrendTable";
import { COECategories } from "@/components/COECategories";
import { COEPremiumChart } from "@/components/COEPremiumChart";
import Typography from "@/components/Typography";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL } from "@/config";
import { type COEBiddingResult, type COEResult, RevalidateTags } from "@/types";
import { fetchApi } from "@/utils/fetchApi";

const COEPricesPage = async () => {
  const params = new URLSearchParams();
  params.append("sort", "month");
  params.append("orderBy", "asc");
  const queryString = params.toString();

  const coeResults = await fetchApi<COEResult[]>(
    `${API_URL}/coe?${queryString}`,
    { next: { tags: [RevalidateTags.COE] } },
  );

  const groupedData = coeResults.reduce<COEBiddingResult[]>((acc, item) => {
    const key = `${item.month}-${item.bidding_no}`;

    if (!acc[key]) {
      acc[key] = {
        month: item.month,
        biddingNo: item.bidding_no,
      };
    }
    acc[key][item.vehicle_class] = item.premium;

    return acc;
  }, []);

  const data: COEBiddingResult[] = Object.values(groupedData);

  return (
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
  );
};

export default COEPricesPage;
