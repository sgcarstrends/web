import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { formatPercent } from "@/utils/formatPercent";
import { aggregateData } from "./aggregate-data";
import type { Car } from "@/types";

interface Props {
  data: Car[];
}

const COLORS_MAP: Record<string, string> = {
  Hybrid: "bg-chart-1",
  Petrol: "bg-chart-2",
  Electric: "bg-chart-3",
  Diesel: "bg-chart-4",
  Others: "bg-chart-5",
};

export const DetailedBreakdown = ({ data }: Props) => {
  const fuelType = aggregateData(data, "fuel_type");
  const total = data.reduce((total, { number = 0 }) => total + number, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detailed Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="uppercase">
              <TableHead>Fuel Type</TableHead>
              <TableHead>Count</TableHead>
              <TableHead>Percentage</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(fuelType)
              .sort(([, a], [, b]) => b - a)
              .map(([key, value]) => (
                <TableRow key={key}>
                  <TableCell className="flex items-center gap-2">
                    <div
                      className={cn("size-3 rounded-full", COLORS_MAP[key])}
                    />
                    <div className="font-medium">{key}</div>
                  </TableCell>
                  <TableCell>{value}</TableCell>
                  <TableCell>
                    {formatPercent(value / total, {
                      minimumFractionDigits: 2,
                    })}
                  </TableCell>
                  <TableCell />
                  <TableCell className="text-primary font-semibold">
                    Details &rarr;
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
