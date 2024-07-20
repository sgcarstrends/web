"use client";

import { useCallback, useEffect, useMemo } from "react";
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
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import { groupByYear } from "@/utils/groupByYear";
import { Month } from "@/types";

interface MonthSelectProps {
  months: Month[];
  defaultMonth: Month;
}

export const MonthSelect = ({ months, defaultMonth }: MonthSelectProps) => {
  const { state, dispatch } = useGlobalState();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const month = searchParams.get("month");

  useEffect(() => {
    if (month) {
      dispatch({ type: "SET_SELECTED_MONTH", payload: month });
    }
  }, [dispatch, month]);

  const memoisedGroupByYear = useMemo(() => groupByYear, []);
  const sortedMonths = useMemo(
    () => Object.entries(memoisedGroupByYear(months)).slice().reverse(),
    [memoisedGroupByYear, months],
  );

  const handleValueChange = useCallback(
    (month: string) => {
      const queryString = new URLSearchParams({ month }).toString();
      router.replace(`${pathname}?${queryString}`);
    },
    [dispatch, pathname, router],
  );

  return (
    <Select
      defaultValue={month || defaultMonth}
      onValueChange={handleValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a month" />
      </SelectTrigger>
      <SelectContent>
        {sortedMonths.map(([year, months]) => (
          <SelectGroup key={year}>
            <SelectLabel>{year}</SelectLabel>
            {months
              .slice()
              .reverse()
              .map((month) => {
                const date = `${year}-${month}`;

                return (
                  <SelectItem key={month} value={date}>
                    {formatDateToMonthYear(date)}
                  </SelectItem>
                );
              })}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};
