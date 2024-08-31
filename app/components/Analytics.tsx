"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const Analytics = () => {
  const pathname = usePathname();

  useEffect(() => {
    const url = "/api/analytics";
    const body = JSON.stringify({ pathname, referrer: document.referrer });

    // Use fetch with keepalive option as a fallback for sendBeacon
    const sendData = () => {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body);
      } else {
        void fetch(url, { method: "POST", body, keepalive: true });
      }
    };

    sendData();

    window.addEventListener("unload", sendData);

    return () => {
      window.removeEventListener("unload", sendData);
    };
  }, [pathname]);

  return null;
};