export type Styles = {
  'nav': string;
  'items': string;
  'link': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
