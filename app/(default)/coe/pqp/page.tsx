import { AlertCircle } from "lucide-react";
import Typography from "@/components/Typography";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DataTable } from "@/components/ui/data-table";
import { API_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { columns } from "./columns";

const PQPRatesPage = async () => {
  const pqpRates = await fetchApi<
    Array<Record<string, Record<string, number>>>
  >(`${API_URL}/coe/pqp`);

  const data = Object.entries(pqpRates).map(([month, pqpRates]) => ({
    month,
    ...pqpRates,
  }));

  return (
    <div className="flex flex-col gap-y-4">
      <Typography.H1>PQP Rates</Typography.H1>
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Understanding PQP Rates</AlertTitle>
        <AlertDescription>
          <Typography.P>
            Certificate of Entitlement (COE) Prevailing Quota Premium (PQP)
            rates are specific to Singapore&apos;s vehicle ownership system.
            They represent the average COE prices over the last 3 months, which
            car owners must pay to renew their existing vehicle&apos;s COE.
          </Typography.P>
          <Typography.P>
            The PQP system allows car owners to extend their COE for another 5
            or 10 years by paying the prevailing market rate rather than bidding
            in the open market. This is particularly relevant for owners who
            wish to keep their vehicles beyond the initial 10-year COE period.
          </Typography.P>
          <Typography.P>
            The Land Transport Authority (LTA) calculates and updates these
            rates monthly based on the moving average of COE prices in the
            preceding three months.
          </Typography.P>
        </AlertDescription>
      </Alert>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PQPRatesPage;
