import Link from "next/link";
import { Progress } from "@/app/components/Progress";
import Typography from "@/components/Typography";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CARS } from "@/constants";
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
          data.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell>
                <Link href={`/make/${item.make}`}>{item.make}</Link>
              </TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>
                <Progress value={marketShare(item.number)}>
                  {new Intl.NumberFormat("en-SG", {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(marketShare(item.number))}
                </Progress>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
