export type TypeStyles = {
  'author': string;
  'text': string;
  'trigger': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
