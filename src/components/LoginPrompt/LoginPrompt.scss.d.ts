export type TypeStyles = {
  'content': string;
  'prompt': string;
  'heading': string;
}

export type TypeClassName = keyof TypeStyles;

declare const styles: TypeStyles;

export default styles;
