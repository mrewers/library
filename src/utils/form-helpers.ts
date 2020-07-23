export const toggleArrayValues = (arr: readonly string[], value: string): string[] => {
  if (arr.includes(value)) {
    return arr.filter(item => item !== value);
  } else {
    return [...arr, value];
  }
};
