import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { geolocation } from "@/functions/geolocation";
import { analyticsTable, type InsertAnalytics } from "@/schema/analytics";

interface RequestData {
  pathname: string;
  referrer: string;
}

export const POST = async (request: NextRequest) => {
  const date = new Date();
  const { pathname, referrer }: RequestData = await request.json();
  const { country, flag } = geolocation(request);

  if (!(country && flag)) {
    return NextResponse.json({ message: "Missing data is required" });
  }

  const dataToInsert: InsertAnalytics = {
    date,
    pathname,
    referrer,
    country,
    flag,
  };

  await db.insert(analyticsTable).values(dataToInsert);
  return NextResponse.json({ message: dataToInsert });
};
