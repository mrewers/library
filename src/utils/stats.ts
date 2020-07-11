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
