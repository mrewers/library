export type Styles = {
  'stats': string;
  'container': string;
  'pair': string;
  'principal': string;
  'secondary': string;
  'topline': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
