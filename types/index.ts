import { FUEL_TYPE } from "@/config";

export interface Car {
  month: string;
  make: string;
  fuel_type: FUEL_TYPE | string;
  number: number;
  selected?: boolean;
}

export type Dataset = {
  label: string;
  data: number[];
};

export interface ChartDataset extends Dataset {
  // borderColor: string;
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
  quota: string;
  bids_success: string;
  bids_received: string;
  premium: string;
}
