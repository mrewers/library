import { createContext } from 'preact';

export const initialBookState: IBookState = {
  books: [],
  readers: [],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BookContext = createContext({
  dispatch: (action: IBookAction): void => {},
  state: initialBookState,
});

interface IBookState {
  readonly books: readonly IBook[];
  readonly readers: readonly string[];
}

interface IBookAction {
  readonly payload: {
    readonly books?: readonly IBook[];
    readonly readers?: readonly string[];
  };
  readonly type: string;
}

export const bookReducer = (state: IBookState, action: IBookAction): IBookState => {
  const { payload } = action;

  switch (action.type) {
    case 'books':
      return {
        ...state,
        books: payload.books,
      };
    case 'readers':
      return {
        ...state,
        readers: payload.readers,
      };
    default:
      return state;
  }
};
