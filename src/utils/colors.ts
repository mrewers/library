import colors from '~/style/exports.scss';

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
