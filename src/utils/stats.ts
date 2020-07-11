/**
 * Calculates a percent value rounded to the the nearest whole number.
 *
 * @param {number} subset Count of selected group.
 * @param {number} total Count of total items against which to calculate percentage.
 * @returns {number} The calculated percent value (number only).
 */
export const calcPercentOf = (subset: number, total: number): number => {
  if (subset === 0 || total === 0) return 0;

  return Math.round((subset / total) * 100);
};

export const getReaders = (rs: readonly string[] = [], operator = 'or'): string => {
  if (rs.length === 0) return '';

  if (rs.length > 3) {
    const message = operator === 'and' ? ' all readers' : ' any reader';

    return message;
  }

  return rs.reduce((r, curr, i) => {
    const op = operator === 'and' ? '&' : 'or';
    const spacer = rs.length < 3 ? ' ' : ', ';

    const delimiter = r.length ? (i + 1 === rs.length ? `${spacer}${op}` : ',') : '';

    return `${r}${delimiter} ${curr}`;
  }, '');
};
