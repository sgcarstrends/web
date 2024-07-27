import { FUEL_TYPE } from "@/config";

export type VEHICLE_TYPE =
  | "Coupe/ Convertible"
  | "Hatchback"
  | "Multi-purpose Vehicle"
  | "Multi-purpose Vehicle/Station-wagon"
  | "Sedan"
  | "Sports Utility Vehicle"
  | "Station-wagon";

export interface Car {
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

export interface COEResult {
  month: string;
  bidding_no: number;
  vehicle_class: string;
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
