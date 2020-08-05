export type TypeStyles = {
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

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
