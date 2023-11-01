/**
 * Code generated from ChatGPT
 *
 * @param items
 */
export const generateUniqueRandomHexColours = (items: any[]) => {
  const colours: string[] = [];

  for (let i: number = 0; i < items.length; i++) {
    const randomColour: string = getRandomHexColour();

    colours.push(randomColour);
  }

  return colours;
};

const getRandomHexColour = (): string => {
  const letters: string = "0123456789ABCDEF";
  let colour: string = "#";

  for (let j: number = 0; j < 6; j++) {
    colour += letters[Math.floor(Math.random() * 16)];
  }

  return colour;
};
