import { JSX } from 'preact';

declare module '*.module.scss';

declare module '*.svg';

declare module '*/__mocks__/data';

interface IBook {
  readonly title: string;
  readonly author: string;
  readonly read: boolean;
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

type TypeEventInput = JSX.TargetedEvent<HTMLInputElement>;

type TypeBookList = readonly IBook[];
