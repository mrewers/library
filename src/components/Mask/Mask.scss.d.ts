export type TypeStyles = {
  'mask': string;
  'background': string;
  'container': string;
  'credit': string;
  'bottom': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
