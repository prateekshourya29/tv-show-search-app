export const createArray = (size: number) => {
  const arr: number[] = [];

  for (let i = 0; i < size; i++) {
    arr.push(i);
  }

  return arr;
};
