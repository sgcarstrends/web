"use client";

import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useStore from "@/app/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDateToMonthYear } from "@/utils/formatDateToMonthYear";
import { groupByYear } from "@/utils/groupByYear";

interface Props {
  months: string[];
}

export const MonthSelector = ({ months }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const month = searchParams.get("month");

  const selectedMonth = useStore((state) => state.selectedMonth);
  const setSelectedMonth = useStore((state) => state.setSelectedMonth);

  useEffect(() => {
    setSelectedMonth(month ?? months[0]);
  }, [month, months, setSelectedMonth]);

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
    [pathname, router],
  );

  return (
    <div>
      <Select value={selectedMonth} onValueChange={handleValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {sortedMonths.map(([year, months]) => (
            <SelectGroup key={year}>
              <SelectLabel>{year}</SelectLabel>
              {months.slice().map((month) => {
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
    </div>
  );
};
