export type Styles = {
  'content': string;
  'prompt': string;
  'heading': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
