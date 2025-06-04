"use client";

import { useMemo } from "react";
import { columns } from "@/app/coe/(prices)/columns";
import useStore from "@/app/store";
import { DataTable } from "@/components/ui/data-table";
import type { COEResult } from "@/types";

interface Props {
  coeResults: COEResult[];
}

export const TrendTable = ({ coeResults }: Props) => {
  const categories = useStore(({ categories }) => categories);

  const sortCOEResults = (a: COEResult, b: COEResult) => {
    if (a.month !== b.month) {
      return b.month.localeCompare(a.month);
    }

    if (a.bidding_no !== b.bidding_no) {
      return b.bidding_no - a.bidding_no;
    }

    return a.vehicle_class.localeCompare(b.vehicle_class);
  };

  const sortedData = useMemo(
    () =>
      coeResults
        .filter(({ vehicle_class }) => categories[vehicle_class])
        .sort(sortCOEResults),
    [categories, coeResults],
  );

  return <DataTable columns={columns} data={sortedData} />;
};
