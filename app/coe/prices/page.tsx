// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Legend,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchApi } from "@/utils/fetchApi";
import { COEBiddingResult, COEResult } from "@/types";
import { API_URL } from "@/config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { COECategories } from "@/components/COECategories";
import { COEPremiumChart } from "@/components/COEPremiumChart";
import Typography from "@/components/Typography";

const COEPricesPage = async () => {
  const historicalResult: COEResult[] = await fetchApi<COEResult[]>(
    `${API_URL}/coe`,
  );

  const groupedData: COEBiddingResult[] = historicalResult.reduce(
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

  const data: COEBiddingResult[] = Object.values(groupedData).sort(
    (a, b) => a.biddingNo - b.biddingNo,
  );

  return (
    <div className="flex flex-col gap-y-8">
      {/*TODO: Allow filtering by year*/}
      <Typography.H1>COE Results Dashboard</Typography.H1>
      <div className="grid gap-4 lg:grid-cols-4">
        <div className="grid gap-4 lg:col-span-2 xl:col-span-3">
          <COEPremiumChart data={data} />
        </div>
        <div className="grid gap-4 lg:col-span-2 xl:col-span-1">
          <COECategories />
        </div>
      </div>
    </div>
  );
};

export default COEPricesPage;
