"use client";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Car } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Car>[] = [
  {
    accessorKey: "month",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Month
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fuel_type",
    header: "Fuel Type",
    cell: ({ row }) => {
      const type = row.getValue("fuel_type") as string;
      return (
        <Link href={`/cars/fuel-types/${type.toLowerCase()}`}>{type}</Link>
      );
    },
  },
  {
    accessorKey: "vehicle_type",
    header: "Vehicle Type",
    cell: ({ row }) => {
      const type = row.getValue("vehicle_type") as string;
      return (
        <Link href={`/cars/vehicle-types/${type.toLowerCase()}`}>{type}</Link>
      );
    },
  },
  {
    accessorKey: "number",
    header: "Count",
  },
];
