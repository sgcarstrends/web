import type { Car, Dataset } from "@/types";

export const transformDataToDatasets = (inputData: Car[]): Dataset[] => {
  const transformedData: Dataset[] = inputData.map(({ make, number }: Car) => ({
    label: make,
    data: [number],
  }));

  const datasets: Dataset[] = transformedData.reduce(
    (acc: Dataset[], item: Dataset) => {
      const existingDataset = acc.find(
        (dataset) => dataset.label === item.label,
      );

      if (existingDataset) {
        existingDataset.data.push(item.data[0]);
      } else {
        acc.push(item);
      }

      return acc;
    },
    [],
  );

  console.log({ datasets });

  return datasets;
};
