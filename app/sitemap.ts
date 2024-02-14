import { MetadataRoute } from "next";
import { SITE_URL } from "@/config";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
};

export default sitemap;
