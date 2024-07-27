import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export const GET = (req: NextRequest) => {
  const secret = req.nextUrl.searchParams.get("secret");
  const tags = req.nextUrl.searchParams.get("tags") as string;

  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
  }

  revalidateTag(tags);
  return NextResponse.json({ revalidated: true, now: Date.now() });
};
