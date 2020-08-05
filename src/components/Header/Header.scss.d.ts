export type TypeStyles = {
  'container': string;
  'title': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
