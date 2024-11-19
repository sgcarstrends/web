import { API_URL, SITE_LINKS, SITE_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import type { Make } from "@/types";
import type { MetadataRoute } from "next";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const makes = await fetchApi<Make[]>(`${API_URL}/make`);

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/cars`,
      lastModified: new Date(),
    },
    ...SITE_LINKS.map((link) => ({
      url: `${SITE_URL}${link.href}`,
      lastModified: new Date(),
    })),
    ...makes.map((make) => ({
      url: `${SITE_URL}/cars/makes/${make}`,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;
