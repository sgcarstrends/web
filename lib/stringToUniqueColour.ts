/**
 * Code generated from ChatGPT
 *
 * Generate a hex colour based on the string provided
 *
 * @param item
 */
export const stringToUniqueColour = (item: string): string => {
  const hashString = (str: string) => {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
  };

  const numericalValue = hashString(item);
  return "#" + (numericalValue & 0x00ffffff).toString(16).toUpperCase();
};
