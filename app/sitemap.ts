import { API_URL, SITE_LINKS, SITE_URL } from "@/config";
import { fetchApi } from "@/utils/fetchApi";
import type { Make } from "@/types";
import type { MetadataRoute } from "next";

// TODO: Interim solution
const FUEL_TYPE = ["petrol", "hybrid", "electric", "diesel"];

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const makes = await fetchApi<Make[]>(`${API_URL}/make`);

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    ...SITE_LINKS.map((link) => ({
      url: `${SITE_URL}${link.href}`,
      lastModified: new Date(),
    })),
    ...makes.map((make) => ({
      url: `${SITE_URL}/make/${make}`,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;
