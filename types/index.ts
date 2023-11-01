export interface Car {
  month: string;
  make: string;
  fuel_type: string;
  number: any;
}

export type Dataset = {
  label: string;
  data: number[];
};

export interface ChartDataset extends Dataset {
  borderColor: string;
}
