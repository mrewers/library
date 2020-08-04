export type Styles = {
  'page-wrapper': string;
  'subhead': string;
  'input-header': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
