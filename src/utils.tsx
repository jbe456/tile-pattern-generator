export const getKey = (combination: number[][]) => {
  return combination.map((row) => row.join("")).join("");
};

export const getTranslations = (combination: number[][]) => {
  const result: number[][][] = [];

  const height = combination.length;
  const width = combination[0].length;

  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const newCombination = [];
      for (let h = 0; h < height; h++) {
        newCombination[h] = combination[(h + j) % height];
      }

      result.push(
        newCombination.map((row) => {
          const newRow = [];
          for (let w = 0; w < width; w++) {
            newRow[w] = row[(w + i) % width];
          }
          return newRow;
        })
      );
    }
  }

  return result;
};
