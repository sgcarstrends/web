import mockCars from "@/__mocks__/mock-cars.json";
import { mergeCarsByVehicleType } from "@/utils/mergeCarsByVehicleType";

describe("mergeCarsByVehicleType", () => {
  it("should merge cars by make and vehicle type", () => {
    const cars = mergeCarsByVehicleType(mockCars);
    expect(cars).toEqual([
      {
        _id: "66e29f9807b823f9e46e52d0",
        fuel_type: "Electric",
        importer_type: "AMD",
        make: "BYD",
        month: "2024-08",
        number: 363,
        vehicle_type: "Sports Utility Vehicle",
      },
      {
        _id: "66e29f9807b823f9e46e52cb",
        fuel_type: "Electric",
        importer_type: "AMD",
        make: "BMW",
        month: "2024-08",
        number: 247,
        vehicle_type: "Sports Utility Vehicle",
      },
      {
        _id: "66e29f9807b823f9e46e52fd",
        fuel_type: "Petrol-Electric",
        importer_type: "PI",
        make: "MERCEDES BENZ",
        month: "2024-08",
        number: 237,
        vehicle_type: "Sports Utility Vehicle",
      },
    ]);
  });
});
