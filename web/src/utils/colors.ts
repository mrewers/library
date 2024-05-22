import colors from 'style/exports.module.scss';

/**
 * Retrieves the hex code for a given color from CSS.
 * @param color The name of the color to retrieve.
 * @returns A string hex value representing the requested color.
 */
export const getColor = (color: string): string => {
  switch (color) {
    case 'blue':
      return colors.blueLight;
    case 'green':
      return colors.green;
    case 'orange':
      return colors.orange;
    case 'pink':
      return colors.pink;
    default:
      return colors.blueDark;
  }
};

export const getDefaultColors = (idx: number) => {
  const options = ['blue', 'orange', 'pink', 'green'];

  return idx < 4 ? getColor(options[idx]) : getColor('default');
};
