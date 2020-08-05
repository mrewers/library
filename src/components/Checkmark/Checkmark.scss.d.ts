export type TypeStyles = {
  'checkmark': string;
  'feather': string;
  'feather-square': string;
  'feather-check-square': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
