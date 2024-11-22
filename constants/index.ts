import type { VEHICLE_TYPE } from "@/types";

export const CARS = {
  TABLE: {
    HEADERS: {
      MAKE: "Make",
      COUNT: "Count",
      MARKET_SHARE: "Distribution",
    },
  },
};

export const MAKE = {
  TABLE: {
    HEADERS: {
      MONTH: "Month",
      FUEL_TYPE: "Fuel Type",
      VEHICLE_TYPE: "Vehicle Type",
      COUNT: "Count",
    },
  },
};

export const VEHICLE_TYPE_MAP: Record<string, string> = {
  "Multi-purpose Vehicle": "MPV",
  "Multi-purpose Vehicle/Station-wagon": "MPV",
  "Sports Utility Vehicle": "SUV",
};
