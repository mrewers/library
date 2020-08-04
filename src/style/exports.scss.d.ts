export type Styles = {
  'blueDark': string;
  'blueLight': string;
  'green': string;
  'orange': string;
  'pink': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
