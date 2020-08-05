export type TypeStyles = {
  'nav': string;
  'items': string;
  'link': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
