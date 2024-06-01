export const groupByYear = (dates: string[] = []) =>
  dates?.reduce((acc: Record<string, string[]>, date) => {
    const [year, month] = date.split("-");
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(month);
    return acc;
  }, {});
