export const BASE_URL: string =
  process.env.NEXT_PUBLIC_BASE_URL || "https://singapore-ev-trends.ruchern.xyz";

export const API_URL: string = `https://api.singapore-ev-trends.ruchern.xyz`;

/**
 * List of make to be excluded from the dataset because they are usually part of the following:
 * - BlueSG (BLUECAR)
 * - Private Hire Cars (PHC)
 */
export const EXCLUSION_LIST: string[] = ["BLUECAR"];

export enum FUEL_TYPE {
  DIESEL = "Diesel",
  ELECTRIC = "Electric",
  OTHERS = "Others",
  PETROL = "Petrol",
}
