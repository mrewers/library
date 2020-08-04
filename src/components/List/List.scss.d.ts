export type Styles = {
  'list': string;
  'read': string;
  'loader': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
