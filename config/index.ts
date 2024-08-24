import type { AppEnv, LinkItem } from "@/types";

const DOMAIN_NAME = "sgcarstrends.com";
const API_VERSION = "v1";

export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${DOMAIN_NAME}`;
export const SITE_TITLE = "SG Cars Trends";

export const APP_ENV = process.env.APP_ENV as AppEnv;

// Configure the API BASE URL
const DEFAULT_API_URL = `https://api.${DOMAIN_NAME}`;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
export const API_URL: string = `${API_BASE_URL}/${API_VERSION}`;

/**
 * List of make to be excluded from the dataset because they are usually part of the following:
 * - BlueSG (BLUECAR)
 * - Private Hire Cars (PHC)
 */
export const EXCLUSION_LIST: string[] = ["BLUECAR"];
export const POPULAR_MAKES_THRESHOLD: number = 8;

export enum FUEL_TYPE {
  DIESEL = "Diesel",
  ELECTRIC = "Electric",
  OTHERS = "Others",
  PETROL = "Petrol",
}

export const HYBRID_REGEX = /^(Diesel|Petrol)-(Electric)(\s\(Plug-In\))?$/;

export const ANNOUNCEMENT = "";

// export const ANNOUNCEMENT =
//   "🌟 Big Updates Ahead! Our website is getting an upgrade with awesome new features rolling out soon. Stay tuned!";

export const MEDAL_MAPPING: Record<number, string> = {
  1: "🥇",
  2: "🥈",
  3: "🥉",
};

export const FEATURE_FLAG_UNRELEASED =
  process.env.NEXT_PUBLIC_FEATURE_FLAG_UNRELEASED === "true";

export const CAR_LINKS: LinkItem[] = [
  { label: "Monthly", href: "/cars" },
  {
    label: "Petrol",
    href: "/cars/petrol",
  },
  {
    label: "Hybrid",
    href: "/cars/hybrid",
  },
  {
    label: "Electric",
    href: "/cars/electric",
  },
  {
    label: "Diesel",
    href: "/cars/diesel",
  },
];

export const COE_LINKS: LinkItem[] = [
  { href: "/coe/prices", label: "COE Prices" },
  { href: "/coe/bidding", label: "COE Bidding" },
];

export const SITE_LINKS: LinkItem[] = [
  ...CAR_LINKS,
  // ...COE_LINKS
];
