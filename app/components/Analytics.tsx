"use client";

import { usePathname } from "next/navigation";

export const Analytics = () => {
  const pathname = usePathname();

  const url = "/api/analytics";

  if (typeof window !== "undefined" || typeof document !== "undefined") {
    const body = JSON.stringify({ pathname, referrer: document.referrer });
    navigator.sendBeacon(url, body);
  }

  return null;
};
