const toggleArrayValues = (arr: readonly string[], value: string): string[] => {
  if (arr.includes(value)) {
    return arr.filter(item => item !== value);
  } else {
    return [...arr, value];
  }
};

export const handleFormInput = (
  target: HTMLInputElement,
  book: IBook
): [string, string | boolean | string[]] => {
  const { name, value } = target;

  let val;

  switch (name) {
    case 'acquired':
      val = value === 'yes';
      break;
    case 'read':
      val = toggleArrayValues(book.read, value)
      break;
    default:
      val = value;
      break;
  }

  return [name, val]
}