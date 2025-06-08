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

export interface RegistrationStat {
  name: string;
  count: number;
}

export interface Registration {
  data: {
    month: string;
    total: number;
    fuelType: RegistrationStat[];
    vehicleType: RegistrationStat[];
  };
}

export interface Comparison {
  data: {
    currentMonth: Data;
    previousMonth: Data;
    previousYear: Data;
  };
}

export interface TopType {
  data: {
    month: string;
    topFuelType: {
      name: string;
      total: number;
    };
    topVehicleType: {
      name: string;
      total: number;
    };
  };
}

export interface Make {
  make: string;
  count: number;
}

export interface FuelType {
  fuelType: string;
  total: number;
  makes: Make[];
}

export interface TopMake {
  data: FuelType[];
}
