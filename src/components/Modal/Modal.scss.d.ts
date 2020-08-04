export type Styles = {
  'background': string;
  'close': string;
  'close-icon': string;
  'container': string;
  'content': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
