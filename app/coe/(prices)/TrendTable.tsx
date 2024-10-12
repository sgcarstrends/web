"use client";

import { columns } from "@/app/coe/(prices)/columns";
import { DataTable } from "@/components/ui/data-table";
import type { COEResult } from "@/types";

interface Props {
  coeResults: COEResult[];
}

export const TrendTable = ({ coeResults }: Props) => {
  const sortedData = coeResults.sort((a, b) => b.month.localeCompare(a.month));
  return <DataTable columns={columns} data={sortedData} />;
};
