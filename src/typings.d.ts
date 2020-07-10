import { JSX } from 'preact';

declare module '*.module.scss';

declare module '*.svg';

declare global {
  interface IBook {
    readonly title: string;
    readonly author?: string;
    readonly read: readonly string[];
  }

  interface IStats {
    readonly all: number;
    readonly read: number;
    readonly unread: number;
  }

  interface IButton {
    readonly classes: string;
    readonly color: string;
    readonly label: string;
    readonly type: string;
  }

  /* eslint-disable @typescript-eslint/no-type-alias */
  type TypeEventInput = JSX.TargetedEvent<HTMLInputElement>;
  type TypeEventSelect = JSX.TargetedEvent<HTMLSelectElement>;

  type TypeBookList = readonly IBook[];
  /* eslint-enable @typescript-eslint/no-type-alias */
}
