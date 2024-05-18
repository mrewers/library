const toggleArrayValues = (arr: readonly string[], value: string): string[] => {
  if (arr.includes(value)) {
    return arr.filter(item => item !== value);
  } else {
    return [...arr, value];
  }
};

export const handleFormInput = (
  target: HTMLInputElement,
  item: any
): [string, string | boolean | string[]] => {
  const { name, value } = target;

  let val;

  switch (name) {
    case 'read':
      val = toggleArrayValues(item.read, value)
      break;
    default:
      val = value;
      break;
  }

  return [name, val]
}