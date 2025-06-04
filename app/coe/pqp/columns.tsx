"use client";

import { formatCurrency } from "@/utils/format-currency";
import type { PQP } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PQP>[] = [
  {
    accessorKey: "month",
    header: "Month",
  },
  {
    accessorKey: "Category A",
    header: "Category A",
    cell: ({ row }) => `S${formatCurrency(row.getValue<number>("Category A"))}`,
  },
  {
    accessorKey: "Category B",
    header: "Category B",
    cell: ({ row }) => `S${formatCurrency(row.getValue<number>("Category B"))}`,
  },
  {
    accessorKey: "Category C",
    header: "Category C",
    cell: ({ row }) => `S${formatCurrency(row.getValue<number>("Category C"))}`,
  },
  {
    accessorKey: "Category D",
    header: "Category D",
    cell: ({ row }) => `S${formatCurrency(row.getValue<number>("Category D"))}`,
  },
];
