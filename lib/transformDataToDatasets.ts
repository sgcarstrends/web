import type { Car, Dataset } from "@/types";

export const transformDataToDatasets = (inputData: Car[]): Dataset[] => {
  const transformedData: Dataset[] = inputData.map(({ make, number }: Car) => ({
    name: make,
    data: [number],
  }));

  return transformedData.reduce((acc: Dataset[], item: Dataset) => {
    const existingDataset = acc.find((dataset) => dataset.name === item.name);

    if (existingDataset) {
      existingDataset.data.push(item.data[0]);
    } else {
      acc.push(item);
    }

    return acc;
  }, []);
};
