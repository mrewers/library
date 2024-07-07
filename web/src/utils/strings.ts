/**
 * Capitalizes the first letter of a given.
 * Note that it will not alter any subsequent characters.
 * @example
 * capitalize("example"); // returns "Example"
 * capitalize("the qUick BROWN fox"); // returns "The qUick BROWN fox"
 * capitalize(4); // returns ""
 * @param str Any string. 
 * @returns The provided string with the first letter capitalized. If non-string value is provided, will return an empty string.
 */
const capitalize = (str: string) => {
  if (typeof str !== 'string') {
    return "";
  }

  const first = str.substring(0, 1);

  return `${first.toLocaleUpperCase()}${str.slice(1, str.length)}`;
}

/**
 * Convert any string to title case (first letter of each word capitalized).
 * @example
 * titleCase("the qUick BROWN fox"); // returns "The Quick Brown Fox"
 * titleCase(4); // returns ""
 * @param str Any string. 
 * @returns The provided string in title case. If non-string value is provided, will return an empty string.
 */
export const titleCase = (str: string) => {
  if (typeof str !== 'string') {
    return "";
  }

  const parts = str.toLocaleLowerCase().split(' ');

  const capitalized = parts.map(part => capitalize(part));

  return capitalized.join(" ");
}