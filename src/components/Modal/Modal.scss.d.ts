export type TypeStyles = {
  'background': string;
  'close': string;
  'close-icon': string;
  'container': string;
  'content': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
