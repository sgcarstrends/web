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
import { useGlobalState } from "@/context/GlobalStateContext";
import { capitaliseWords } from "@/utils/capitaliseWords";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";

interface DataTableProps {
  data: any[];
  fuelType: string;
}

export const DataTable = ({ data, fuelType }: DataTableProps) => {
  const { state } = useGlobalState();
  const { selectedMonth } = state;

  data = data.filter(({ month }) => month === selectedMonth);

  const excludeHeaders = [
    "_id",
    "importer_type",
    "vehicle_type",
    "month",
    "fuel_type",
  ];
  const tableHeaders = Object.keys(data[0])
    .filter((item) => !excludeHeaders.includes(item))
    .map((header) => capitaliseWords(header));

  const total = data.reduce((accum, curr) => accum + curr.number, 0);
  const getWeight = (number: number) => number / total;

  data.sort((a, b) => getWeight(b.number) - getWeight(a.number));

  return (
    <Table>
      {selectedMonth && (
        <TableCaption>
          {capitaliseWords(fuelType)} cars registration in Singapore for{" "}
          {formatDateToMonthYear(selectedMonth)}
        </TableCaption>
      )}
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          {tableHeaders.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
          <TableHead>Weightage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => {
          const serial = index + 1;
          return (
            <TableRow key={item._id} className="even:bg-muted">
              <TableCell>{MEDAL_MAPPING[serial] || serial}</TableCell>
              <TableCell>
                <Link href={`/make/${item.make}`}>{item.make}</Link>
              </TableCell>
              <TableCell>{item.number}</TableCell>
              <TableCell>
                <Progress value={getWeight(item.number)}>
                  {new Intl.NumberFormat("en-SG", {
                    style: "percent",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(getWeight(item.number))}
                </Progress>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell colSpan={2}>{total}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
