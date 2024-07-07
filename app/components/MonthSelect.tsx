"use client";

import { useCallback, useEffect, useMemo } from "react";
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

interface MonthSelectProps {
  months: string[];
  selectedMonth: string;
}

export const MonthSelect = ({ months, selectedMonth }: MonthSelectProps) => {
  const { state, dispatch } = useGlobalState();

  useEffect(() => {
    if (selectedMonth) {
      dispatch({ type: "SET_SELECTED_MONTH", payload: selectedMonth });
    }
  }, [dispatch, selectedMonth]);

  const memoisedGroupByYear = useMemo(() => groupByYear, []);
  const sortedMonths = useMemo(
    () => Object.entries(memoisedGroupByYear(months)).slice().reverse(),
    [memoisedGroupByYear, months],
  );

  const handleValueChange = useCallback(
    (month: string) => {
      dispatch({ type: "SET_SELECTED_MONTH", payload: month });
    },
    [dispatch],
  );

  return (
    <Select value={state.selectedMonth} onValueChange={handleValueChange}>
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
