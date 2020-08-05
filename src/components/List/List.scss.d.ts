export type TypeStyles = {
  'list': string;
  'read': string;
  'loader': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
