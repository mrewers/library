export type TypeStyles = {
  'button': string;
  'accent': string;
  'dark': string;
  'light': string;
  'plain': string;
  'white': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
