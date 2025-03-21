import { addYears, format } from "date-fns";
import { createLoader, parseAsString } from "nuqs/server";

const getCurrentDate = format(new Date(), "yyyy-MM");
const getDateOneYearAgo = format(addYears(new Date(), -1), "yyyy-MM");

export const coeSearchParams = {
  from: parseAsString.withDefault(getDateOneYearAgo),
  to: parseAsString.withDefault(getCurrentDate),
};

export const loadSearchParams = createLoader(coeSearchParams);
