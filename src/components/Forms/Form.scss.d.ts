export type Styles = {
  'form': string;
  'add': string;
  'button': string;
  'button-container': string;
  'label': string;
  'meta-label': string;
  'meta-label-text': string;
  'sub-label': string;
  'sub-label-column': string;
  'sub-label-container': string;
  'title': string;
}

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
