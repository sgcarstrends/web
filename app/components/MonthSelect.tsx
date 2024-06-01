"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGlobalState } from "@/context/GlobalStateContext";
import months from "../../data/months.json";

export const MonthSelect = () => {
  const { state, dispatch } = useGlobalState();

  const sortedMonths = months.reverse();
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
        {sortedMonths.map((month) => (
          <SelectItem key={month} value={month}>
            {month}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
