import { Battery, Droplet, Fuel, Zap } from "lucide-react";
import { VEHICLE_TYPE_MAP } from "@/constants";
import { slugify } from "@/utils/slugify";
import type { AppEnv, LinkItem, VehicleType } from "@/types";

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

export enum FUEL_TYPE {
  DIESEL = "Diesel",
  ELECTRIC = "Electric",
  HYBRID = "Hybrid",
  OTHERS = "Others",
  PETROL = "Petrol",
}

export const HYBRID_REGEX = /^(Diesel|Petrol)-(Electric)(\s\(Plug-In\))?$/;

export const ANNOUNCEMENT = null;

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
    icon: Fuel,
  },
  {
    label: "Hybrid",
    description: "Includes Petrol, Diesel and Plug-In types",
    icon: Zap,
  },
  {
    label: "Electric",
    description: "Battery Electric Vehicles (BEV)",
    icon: Battery,
  },
  {
    label: "Diesel",
    description: "Compression-ignition engine vehicles",
    icon: Droplet,
  },
]
  .map((link) => ({
    ...link,
    href: `/cars/fuel-types/${slugify(link.label)}`,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const VEHICLE_TYPE_LINKS: LinkItem[] = [
  { label: "Hatchback" },
  { label: "Sedan" },
  { label: "Multi-purpose Vehicle" },
  { label: "Station-wagon" },
  { label: "Sports Utility Vehicle" },
  { label: "Coupe/Convertible" },
]
  .map((link) => {
    const label = link.label as VehicleType;
    return {
      ...link,
      label: VEHICLE_TYPE_MAP[label] ?? label,
      href: `/cars/vehicle-types/${slugify(link.label)}`,
    };
  })
  .sort((a, b) => a.label.localeCompare(b.label));

export const COE_LINKS: LinkItem[] = [
  { href: "/coe", label: "COE Result" },
  // { href: "/coe/prices", label: "COE Prices" },
  // { href: "/coe/bidding", label: "COE Bidding" },
];

export const SITE_LINKS: LinkItem[] = [
  ...FUEL_TYPE_LINKS,
  ...VEHICLE_TYPE_LINKS,
  ...COE_LINKS,
];

export const LAST_UPDATED_CARS_KEY = "last_updated:cars";
export const LAST_UPDATED_COE_KEY = "last_updated:coe";
