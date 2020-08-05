export type TypeStyles = {
  'page-wrapper': string;
  'subhead': string;
  'input-header': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
