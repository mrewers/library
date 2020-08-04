export type Styles = {
  'mask': string;
  'background': string;
  'container': string;
  'credit': string;
  'bottom': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
