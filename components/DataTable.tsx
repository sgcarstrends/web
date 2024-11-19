import Link from "next/link";
import Typography from "@/components/Typography";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CARS } from "@/constants";
import { formatPercent } from "@/utils/formatPercent";
import type { Car } from "@/types";

interface Props {
  data: Car[];
}

export const DataTable = ({ data }: Props) => {
  const total = data.reduce((accum, curr) => accum + curr.number, 0);
  const marketShare = (number: number) => number / total;

  data.sort((a, b) => marketShare(b.number) - marketShare(a.number));

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {Object.values(CARS.TABLE.HEADERS).map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={Object.entries(CARS.TABLE.HEADERS).length}
              className="text-center"
            >
              <Typography.H4>No data available</Typography.H4>
            </TableCell>
          </TableRow>
        )}
        {data.length > 0 &&
          data.map(({ make, number }, index) => (
            <TableRow key={make}>
              <TableCell>
                <Link href={`/cars/makes/${make}`}>{make}</Link>
              </TableCell>
              <TableCell>{number}</TableCell>
              <TableCell>
                <Typography.Muted>
                  {formatPercent(marketShare(number), {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography.Muted>
                <Progress value={marketShare(number) * 100} className="h-1.5" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
