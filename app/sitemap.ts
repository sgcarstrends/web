import { API_URL, SITE_URL } from "@/config";
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
    {
      url: `${SITE_URL}/cars`,
      lastModified: new Date(),
    },
    ...FUEL_TYPE.map((type) => ({
      url: `${SITE_URL}/cars/${type}`,
      lastModified: new Date(),
    })),
    ...makes.map((make) => ({
      url: `${SITE_URL}/make/${make}`,
      lastModified: new Date(),
    })),
  ];
};

export default sitemap;
