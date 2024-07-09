import { FUEL_TYPE } from "@/config";

export interface Car {
  month: string;
  make: string;
  fuel_type: FUEL_TYPE | string;
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
  icon: string;
}

export interface COEResult {
  _id: string;
  month: string;
  bidding_no: string;
  vehicle_class: string;
  quota: number;
  bids_success: number;
  bids_received: number;
  premium: number;
}
