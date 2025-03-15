"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatOrdinal } from "@/utils/formatOrdinal";
import type { COEResult } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

const formatCurrency = (value: any) =>
  Intl.NumberFormat("en-SG", {
    style: "currency",
    currency: "SGD",
    minimumFractionDigits: 0,
  }).format(value);

// const formatPercent = (value: any) =>
//   Intl.NumberFormat("en-SG", { style: "percent" }).format(value);

export const columns: ColumnDef<COEResult>[] = [
  {
    accessorKey: "month",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Month
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: "vehicle_class",
    header: "Category",
    cell: ({ row }) =>
      row.getValue<string>("vehicle_class").split("Category")[1],
  },
  {
    accessorKey: "premium",
    header: "Quota Premium (S$)",
    cell: ({ row }) => `S${formatCurrency(row.getValue<number>("premium"))}`,
  },
  {
    accessorKey: "bidding_no",
    header: "Bidding Round",
    cell: ({ row }) =>
      `${formatOrdinal(row.getValue<number>("bidding_no"))} Round`,
  },
  // { accessorKey: "quota", header: "Quota" },
  // { accessorKey: "bids_received", header: "Bids Received" },
  // {
  //   accessorKey: "bids_success",
  //   header: "Bids Success",
  //   cell: ({ row }) =>
  //     `${row.getValue("bids_success") as number} (${formatPercent((row.getValue("bids_success") as number) / (row.getValue("bids_received") as number))})`,
  // },
  // {
  //   accessorKey: "oversubscribed",
  //   header: "Oversubscribed (%)",
  //   cell: ({ row }) =>
  //     formatPercent(
  //       (row.getValue("bids_received") as number) /
  //         (row.getValue("quota") as number) -
  //         1,
  //     ),
  // },
];
