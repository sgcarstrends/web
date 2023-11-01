export const transformDataToDatasets = (inputData) => {
  const transformedData = inputData.map((item) => ({
    label: item.make,
    data: [item.number],
  }));

  const datasets = transformedData.reduce((acc, item) => {
    const existingDataset = acc.find((dataset) => dataset.label === item.label);
    if (existingDataset) {
      existingDataset.data.push(item.data[0]);
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  return datasets;
};
