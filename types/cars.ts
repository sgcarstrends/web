interface Metric {
  label: string;
  count: number;
}

interface Data {
  period: string;
  total: number;
  fuelType: Metric[];
  vehicleType: Metric[];
}

export interface Comparison {
  data: {
    currentMonth: Data;
    previousMonth: Data;
    previousYear: Data;
  };
}
