"use client";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deslugify, slugify } from "@/utils/slugify";
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
      const type: string = row.getValue("fuel_type");
      return (
        <Link href={`/cars/fuel-types/${slugify(type)}`}>
          {deslugify(type)}
        </Link>
      );
    },
  },
  {
    accessorKey: "vehicle_type",
    header: "Vehicle Type",
    cell: ({ row }) => {
      const type: string = row.getValue("vehicle_type");
      return (
        <Link href={`/cars/vehicle-types/${slugify(type)}`}>
          {deslugify(type)}
        </Link>
      );
    },
  },
  {
    accessorKey: "number",
    header: "Count",
  },
];
