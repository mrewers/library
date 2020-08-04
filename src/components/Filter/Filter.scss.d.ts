export type Styles = {
  'container': string;
  'dropdown': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
