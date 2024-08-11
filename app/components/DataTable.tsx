"use client";

import Link from "next/link";
import { Progress } from "@/app/components/Progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MEDAL_MAPPING } from "@/config";
import Typography from "@/components/Typography";
import { useGlobalState } from "@/context/GlobalStateContext";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import { CARS } from "@/constants";

// TODO: Fix type
interface DataTableProps {
  data: any[];
  fuelType: string;
}

export const DataTable = ({ data, fuelType }: DataTableProps) => {
  const { state } = useGlobalState();
  const { selectedMonth } = state;

  data = data.filter(({ month }) => month === selectedMonth);

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
