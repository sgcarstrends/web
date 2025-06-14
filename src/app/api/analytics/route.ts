import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { geolocation } from "@/functions/geolocation";
import { analyticsTable, type InsertAnalytics } from "@/schema/analytics";

interface RequestData {
  pathname: string;
  referrer: string;
}

export const POST = async (request: NextRequest) => {
  const { pathname, referrer }: RequestData = await request.json();
  const { country, flag, city, latitude, longitude } = geolocation(request);

  if (!(country && flag && city && latitude && longitude)) {
    return NextResponse.json({ message: "Missing data is required" });
  }

  const dataToInsert: InsertAnalytics = {
    pathname,
    referrer,
    country,
    city,
    flag,
    latitude,
    longitude,
  };

  await db.insert(analyticsTable).values(dataToInsert);

  return NextResponse.json({ message: dataToInsert });
};
