"use client";

import { columns } from "@/app/coe/(prices)/columns";
import { DataTable } from "@/components/ui/data-table";
import type { COEResult } from "@/types";

interface Props {
  coeResults: COEResult[];
}

export const TrendTable = ({ coeResults }: Props) => {
  const sortCOEResults = (a: COEResult, b: COEResult) => {
    if (a.month !== b.month) {
      return b.month.localeCompare(a.month);
    }

    if (a.bidding_no !== b.bidding_no) {
      return b.bidding_no - a.bidding_no;
    }

    return a.vehicle_class.localeCompare(b.vehicle_class);
  };

  const sortedData = coeResults.sort(sortCOEResults);

  return <DataTable columns={columns} data={sortedData} />;
};
