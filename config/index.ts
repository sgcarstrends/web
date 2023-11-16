export const isProd = process.env.NODE_ENV === "production";

export const BASE_URL: string = !isProd
  ? `http://localhost:3000`
  : `https://singapore-ev-trends.ruchern.xyz`;

export const API_URL: string = `https://api.singapore-ev-trends.ruchern.xyz`;

export enum FUEL_TYPE {
  DIESEL = "Diesel",
  ELECTRIC = "Electric",
  OTHERS = "Others",
  PETROL = "Petrol",
}
