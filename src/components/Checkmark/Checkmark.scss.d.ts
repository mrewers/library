export type Styles = {
  'checkmark': string;
  'feather': string;
  'feather-square': string;
  'feather-check-square': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
