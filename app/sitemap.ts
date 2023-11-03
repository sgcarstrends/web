import { MetadataRoute } from "next";
import { BASE_URL } from "@/config";

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
};

export default sitemap;
