import { Battery, Droplet, Fuel, Zap } from "lucide-react";
import type { AppEnv, LinkItem } from "@/types";

export const DOMAIN_NAME = "sgcarstrends.com";
const API_VERSION = "v1";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? `https://${DOMAIN_NAME}`;
export const SITE_TITLE = "SG Cars Trends";

export const APP_ENV = process.env.APP_ENV as AppEnv;

// Configure the API BASE URL
const DEFAULT_API_URL = `https://api.${DOMAIN_NAME}`;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;
export const API_URL = `${API_BASE_URL}/${API_VERSION}`;

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

export const FUEL_TYPE_LINKS: LinkItem[] = [
  {
    label: "Petrol",
    description: "Internal Combustion Engine (ICE) vehicles",
    href: "/cars/fuel-types/petrol",
    icon: Fuel,
  },
  {
    label: "Hybrid",
    description: "Includes Petrol, Diesel and Plug-In types",
    href: "/cars/fuel-types/hybrid",
    icon: Zap,
  },
  {
    label: "Electric",
    description: "Battery Electric Vehicles (BEV)",
    href: "/cars/fuel-types/electric",
    icon: Battery,
  },
  {
    label: "Diesel",
    description: "Compression-ignition engine vehicles",
    href: "/cars/fuel-types/diesel",
    icon: Droplet,
  },
].sort((a, b) => a.label.localeCompare(b.label));

export const VEHICLE_TYPE_LINKS: LinkItem[] = [
  {
    label: "Hatchback",
    href: "/cars/vehicle-types/hatchback",
  },
  {
    label: "Sedan",
    href: "/cars/vehicle-types/sedan",
  },
  {
    label: "Multi-purpose Vehicle",
    href: "/cars/vehicle-types/multi-purpose vehicle",
  },
  {
    label: "Station-wagon",
    href: "/cars/vehicle-types/station-wagon",
  },
  {
    label: "Sports Utility Vehicle",
    href: "/cars/vehicle-types/sports utility vehicle",
  },
  {
    label: "Coupe/Convertible",
    href: `/cars/vehicle-types/${encodeURIComponent("coupe/convertible")}`,
  },
].sort((a, b) => a.label.localeCompare(b.label));

export const COE_LINKS: LinkItem[] = [
  { href: "/coe", label: "Dashboard" },
  // { href: "/coe/prices", label: "COE Prices" },
  // { href: "/coe/bidding", label: "COE Bidding" },
];

export const SITE_LINKS: LinkItem[] = [
  ...FUEL_TYPE_LINKS,
  ...VEHICLE_TYPE_LINKS,
  ...COE_LINKS,
];
