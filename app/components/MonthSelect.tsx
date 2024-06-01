"use client";

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
}

export const MonthSelect = ({ months }: MonthSelectProps) => {
  const { state, dispatch } = useGlobalState();

  const sortedMonths = Object.entries(groupByYear(months)).reverse();
  const selectedMonth = state.selectedMonth;

  return (
    <Select
      defaultValue={selectedMonth}
      onValueChange={(month) =>
        dispatch({ type: "SET_SELECTED_MONTH", payload: month })
      }
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
