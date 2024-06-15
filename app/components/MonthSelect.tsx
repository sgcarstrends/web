"use client";

import { useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalState } from "@/context/GlobalStateContext";
import { groupByYear } from "@/utils/groupByYear";

interface MonthSelectProps {
  months: string[];
  selectedMonth?: string;
}

export const MonthSelect = ({ months, selectedMonth }: MonthSelectProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    if (selectedMonth) {
      dispatch({ type: "SET_SELECTED_MONTH", payload: selectedMonth });
    }
  }, [dispatch, selectedMonth]);

  const sortedMonths = Object.entries(groupByYear(months)).reverse();

  const handleValueChange = useCallback(
    (month: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("month", month);
      dispatch({ type: "SET_SELECTED_MONTH", payload: month });
      router.push(`${pathname}?${params.toString()}`);
    },
    [dispatch, pathname, router, searchParams],
  );

  return (
    <Select
      defaultValue={state.selectedMonth}
      onValueChange={handleValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        {sortedMonths.map(([year, months]) => (
          <SelectGroup key={year}>
            <SelectLabel>{year}</SelectLabel>
            {months.reverse().map((month) => {
              const date = `${year}-${month}`;

              return (
                <SelectItem key={month} value={date} className="cursor-pointer">
                  {date}
                </SelectItem>
              );
            })}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
