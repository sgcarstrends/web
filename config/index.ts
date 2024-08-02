const DOMAIN_NAME = "sgmotortrends.com" as const;
const API_VERSION = "v1" as const;

export const SITE_URL: string =
  process.env.NEXT_PUBLIC_SITE_URL || `https://${DOMAIN_NAME}`;

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

export const ANNOUNCEMENT: string =
  "🌟 Big Updates Ahead! Our website is getting an upgrade with awesome new features rolling out soon. Stay tuned!";

export const CHART_COLOURS: string[] = [
  "#002D62",
  "#CB6D51",
  "#546E7A",
  "#D4526E",
  "#265C00",
  "#C77D95",
  "#A5978B",
  "#B2C8A3",
  "#13D8AA",
  "#FFDA47",
];
