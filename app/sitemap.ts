import { API_URL, SITE_LINKS, SITE_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import { slugify } from "@/utils/slugify";
import type { Make } from "@/types";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const makes = await fetchApi<Make[]>(`${API_URL}/make`);

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
    },
    {
      url: `${SITE_URL}/cars`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
    },
    ...SITE_LINKS.map((link) => ({
      url: `${SITE_URL}${link.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
    })),
    ...makes.map((make) => ({
      url: `${SITE_URL}/cars/makes/${slugify(make)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
    })),
  ];
};

export default sitemap;
