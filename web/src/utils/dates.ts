/**
 * Convert passed value to a string and adds zeros at the begin to make a two digit number.
 * Example: turns 2 into '02'.
 *
 * @param {number|string} val The value to pad with a zero.
 * @returns {string} A two digit string.
 */
const padTwo = (val: string | number): string => val.toString().padStart(2, '0');

/**
 * Retrieved a string representing the current date (for use with date input).
 *
 * @returns {string} Date in the format YYYY-MM-DD.
 */
export const getDateString = (date?: Date): string => {
  const d = date ? date : new Date();

  const year = d.getFullYear();
  const month = padTwo(d.getMonth() + 1); // +1 because months are zero indexed
  const day = padTwo(d.getDate());

  return `${year}-${month}-${day}`;
};

export const getTimeString = (date?: Date): string => {
  const d = date ? date : new Date();

  const hours = padTwo(d.getHours());
  const minutes = padTwo(d.getMinutes());
  const seconds = padTwo(d.getSeconds());

  return `${hours}:${minutes}:${seconds}`
}

export const getDateTimeString = (): string => {
  const date = new Date();

  return `${getDateString(date)} ${getTimeString(date)}`
}