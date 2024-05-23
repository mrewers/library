declare module '*.scss';

declare module '*.svg';

declare global {
  interface IBook {
    readonly id?: string;
    readonly author?: string;
    readonly dateAcquired?: string;
    readonly dateRestored?: string;
    readonly dateRetired?: string;
    readonly read: readonly string[];
    readonly retired: boolean;
    readonly title: string;
  }

  interface IReader {
    readonly id: string;
    readonly name: string;
    readonly color?: string;
    readonly tempId?: string;
  }

  interface IRetired extends IBook {
    readonly dateRetired?: string;
  }

  interface IStats {
    readonly all: number;
    readonly read: number;
    readonly unread: number;
  }

  /* eslint-disable @typescript-eslint/no-type-alias */
  // type TypeEventInput = JSX.TargetedEvent<HTMLInputElement>;
  // type TypeEventSelect = JSX.TargetedEvent<HTMLSelectElement>;

  type TypeBookList = readonly IBook[];
  /* eslint-enable @typescript-eslint/no-type-alias */

  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};