"use client";

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
import { useGlobalState } from "@/context/GlobalStateContext";
import { capitaliseWords } from "@/utils/capitaliseWords";

interface DataTableProps {
  data: any[];
  fuelType: string;
}

const MEDAL_MAPPING: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

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
  const tableHeaders = Object.keys(data.at(0))
    .filter((item) => !excludeHeaders.includes(item))
    .map((header) => capitaliseWords(header));
  const total = data.reduce((accum, curr) => accum + curr.number, 0);
  const getWeight = (number: number) => number / total;

  data = data.sort((a, b) => getWeight(b.number) - getWeight(a.number));

  return (
    <Table>
      <TableCaption>
        {capitaliseWords(fuelType)} cars registration in Singapore for{" "}
        {selectedMonth}
      </TableCaption>
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
            <TableRow key={item._id}>
              <TableCell>{MEDAL_MAPPING[serial] || serial}</TableCell>
              <TableCell>{item.make}</TableCell>
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
