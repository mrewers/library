export type TypeStyles = {
  'container': string;
  'dropdown': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
