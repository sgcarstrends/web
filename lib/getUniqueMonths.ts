import { parseISO } from "date-fns";

export const getUniqueMonths = (data: any[], sortKey: string = "month") =>
  [...new Set(data.map((item) => item[sortKey]))].sort((a, b) => {
    const monthA = parseISO(a);
    const monthB = parseISO(b);

    return monthA.getTime() - monthB.getTime();
  });
