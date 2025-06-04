import { APP_ENV, SITE_URL } from "@/config";
import { AppEnv } from "@/types";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  const protectedPaths = ["/api/", "/_next/"];

  let rules: MetadataRoute.Robots["rules"];
  switch (APP_ENV) {
    case AppEnv.PROD:
      rules = [
        { userAgent: "*", allow: "/" },
        { userAgent: "*", allow: "/api/og/" },
        { userAgent: "*", disallow: protectedPaths },
      ];
      break;

    case AppEnv.STAGING:
    case AppEnv.DEV:
    default:
      rules = [
        { userAgent: "*", allow: "/api/og/" },
        { userAgent: "*", disallow: "/" },
        {
          userAgent: "AhrefsSiteAudit",
          allow: "/",
          disallow: protectedPaths,
        },
        {
          userAgent: "AhrefsSiteAudit",
          allow: "/public/x5wwykuhfx3gazs9h8y3fq9fxtnmv9zw.txt",
          disallow: protectedPaths,
        },
      ];
      break;
  }

  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};

export default robots;
