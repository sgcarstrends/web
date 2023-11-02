import { MetadataRoute } from "next";
import { BASE_URL } from "@/config";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
  },
  sitemap: `${BASE_URL}/sitemap.xml`,
});

export default robots;
