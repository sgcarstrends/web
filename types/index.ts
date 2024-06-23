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
  _id?: string;
  month: string;
  make: string;
  fuel_type: FUEL_TYPE | string;
  vehicle_type: VEHICLE_TYPE | string;
  number: number;
  selected?: boolean;
}

export type PopularMake = Pick<Car, "make" | "number">;

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
  _id: string;
  month: string;
  bidding_no: number;
  vehicle_class: string;
  quota: number;
  bids_success: number;
  bids_received: number;
  premium: number;
}
