export type TypeStyles = {
  'blue-dark': string;
  'blue-light': string;
  'green': string;
  'orange': string;
  'pink': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
