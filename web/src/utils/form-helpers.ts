const toggleArrayValues = (arr: readonly string[], value: string): string[] => {
  if (arr.includes(value)) {
    return arr.filter(item => item !== value);
  } else {
    return [...arr, value];
  }
};

export const handleFormInput = (
  target: HTMLInputElement,
  item: any,
): [string, string | boolean | string[]] => {
  const { name, value } = target;

  let val;

  switch (name) {
    case 'readBy':
      val = toggleArrayValues(item.readBy, value)
      break;
    default:
      val = value;
      break;
  }

  return [name, val];
}

interface IFormSelectData {
  /** The name of the select element retrieved from the DOM. */
  name: string
  /** The name of the property with the book to be updated. */
  field: string
  /** The value to associate with the 'field' property in the updated book. */
  val: any
}

/**
 * Manage the data when a user interacts with a select element.
 * Supports nesting one level deep.
 * @param target The select element that the user has interacted with.
 * @param book The current book to be updated.
 * @returns {Object} IFormSelectData The data derived from the user interaction with a select.
 * @returns {string} IFormSelectData.name The name of the select element retrieved from the DOM.
 * @returns {string} IFormSelectData.field The name of the property with the book to be updated.
 * @returns {any} IFormSelectData.val The value to associate with the 'field' property in the updated book.
 */
export const handleFormSelect = (
  target: HTMLSelectElement,
  book: IBook,
): IFormSelectData => {
  const {name, value} = target;

  const data = {
    name,
    field: "",
    val: undefined as any,
  } as IFormSelectData;

  const parts = name.split('-', 2);

  if (parts.length === 0) {
    return data;
  }

  let val;

  if (parts.length === 1) {
    val = value;
  } else if (parts.length === 2) {
    val = {
      ...book[parts[0] as keyof IBook] as Record<string, any>,
      [parts[1]]: value,
    };
  }

  data.field = parts[0];
  data.val = val;

  return data;
}