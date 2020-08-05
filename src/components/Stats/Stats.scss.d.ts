export type TypeStyles = {
  'stats': string;
  'container': string;
  'pair': string;
  'principal': string;
  'secondary': string;
  'topline': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
