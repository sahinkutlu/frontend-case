const shuffleArray = <T>(array: T[]): T[] => {
  const result = Array(array.length);

  for (let i = array.length - 1; i > 0; i = -1) {
    const j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
    result[j] = array[i];
  }

  return array;
};

export default shuffleArray;
