import { APP_ENV, SITE_URL } from "@/config";
import { AppEnv } from "@/types";
import type { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  // Set the default rule
  let rules: MetadataRoute.Robots["rules"] = { userAgent: "*" };

  // Allow or disallow indexing based on app environment
  if (APP_ENV === AppEnv.PROD) {
    rules = { ...rules, allow: "/" };
  } else {
    rules = { ...rules, disallow: "/" };
  }

  return {
    rules,
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};

export default robots;
