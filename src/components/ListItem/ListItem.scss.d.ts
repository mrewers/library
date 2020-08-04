export type Styles = {
  'author': string;
  'text': string;
  'trigger': string;
  'checked-blue': string;
  'checked-green': string;
  'checked-pink': string;
  'checked-generic': string;
  'unchecked': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
