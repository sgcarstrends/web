import { type NextRequest, NextResponse } from "next/server";
import { geolocation } from "@vercel/functions";
import { db } from "@/config/db";
import { analyticsTable } from "@/schema/analytics";

export const POST = async (request: NextRequest) => {
  const date = new Date();
  const data = await request.json();
  console.log(geolocation(request));
  const { country, flag } = geolocation(request);

  if (country || flag) {
    const test = await db
      .insert(analyticsTable)
      .values({ ...data, date, country, flag });
    console.log(test);
    return NextResponse.json({});
  }

  return NextResponse.json({ message: "Missing values required" });
};
