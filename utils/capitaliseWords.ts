export const capitaliseWords = (input: string) => {
  const splitRegex = /[\s_\/]+/;

  const words = input.split(splitRegex);

  const capitalise = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

  return input.split(splitRegex).reduce((result, word, index) => {
    result += capitalise[index];

    const separator = input.slice(result.length, result.length + 1);
    if (separator === "/") {
      result += separator;
    } else if (index < words.length - 1) {
      result += " ";
    }

    return result;
  }, "");
};
