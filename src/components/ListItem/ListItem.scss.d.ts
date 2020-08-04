export type Styles = {
  'author': string;
  'text': string;
  'trigger': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
