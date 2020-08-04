export type Styles = {
  'button': string;
  'accent': string;
  'dark': string;
  'light': string;
  'plain': string;
  'white': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
