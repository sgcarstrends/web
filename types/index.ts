import { FUEL_TYPE } from "@/config";
import type { LucideIcon } from "lucide-react";

export type VEHICLE_TYPE =
  | "Coupe/ Convertible"
  | "Hatchback"
  | "Multi-purpose Vehicle"
  | "Multi-purpose Vehicle/Station-wagon"
  | "Sedan"
  | "Sports Utility Vehicle"
  | "Station-wagon";

export interface Car {
  _id?: string;
  month: string;
  make: string;
  importer_type?: string;
  fuel_type: FUEL_TYPE;
  vehicle_type: VEHICLE_TYPE;
  number: number;
  selected?: boolean;
}

export type Dataset = {
  name: string;
  data: number[];
};

export interface ChartDataset extends Dataset {
  checked: boolean;
}

export interface TabItem {
  title: string;
  href: string;
}

export type COECategory =
  | "Category A"
  | "Category B"
  | "Category C"
  | "Category D"
  | "Category E";
export type COECategoryFilter = Record<COECategory, boolean>;

export interface COEResult {
  month: string;
  bidding_no: number;
  vehicle_class: COECategory;
  quota: number;
  bids_success: number;
  bids_received: number;
  premium: number;
}

export interface LatestMonth {
  cars: string;
  coe: string;
}

export interface COEBiddingResult {
  month: string;
  biddingNo: number;
  "Category A": number;
  "Category B": number;
  "Category C": number;
  "Category D": number;
  "Category E": number;
}

export enum RevalidateTags {
  Cars = "cars",
  COE = "coe",
}

export type Make = Car["make"];

export enum AppEnv {
  DEV = "dev",
  STAGING = "staging",
  PROD = "prod",
}

export interface LinkItem {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  comingSoon?: boolean;
}
