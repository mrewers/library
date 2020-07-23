import { createContext } from 'preact';

export const initialBookState: IBookState = {
  books: [],
  readerData: [],
  readers: [],
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BookContext = createContext({
  dispatch: (action: IBookAction): void => {
    console.log(action);
  },
  state: initialBookState,
});

const getReadersList = (data: readonly IReader[]): string[] => {
  return data.map(reader => reader.name);
};

const addBook = (books: readonly IBook[], book: IBook): IBook[] => {
  return [...books, book];
};

const updateSingleBook = (books: readonly IBook[], book: IBook, id: string): IBook[] => {
  return books.map(b => {
    if (b.id === id) {
      return book;
    }

    return b;
  });
};

export const bookReducer = (state: IBookState, action: IBookAction): IBookState => {
  const { payload } = action;

  switch (action.type) {
    case 'ADD_BOOK':
      return {
        ...state,
        books: addBook(state.books, payload.book),
      };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: updateSingleBook(state.books, payload.book, payload.id),
      };
    case 'UPDATE_BOOKS':
      return {
        ...state,
        books: payload.books,
      };
    case 'UPDATE_READER_DATA':
      return {
        ...state,
        readerData: payload.data,
        readers: getReadersList(payload.data),
      };
    case 'UPDATE_READERS':
      return {
        ...state,
        readers: payload.readers,
      };
    default:
      return state;
  }
};

// Book context types
declare global {
  interface IReader {
    readonly name: string;
    readonly color?: string;
  }

  interface IBookState {
    readonly books: readonly IBook[];
    readonly readerData: readonly IReader[];
    readonly readers: readonly string[];
  }

  interface IBookAction {
    readonly payload: {
      readonly books?: readonly IBook[];
      readonly book?: IBook;
      readonly data?: readonly IReader[];
      readonly id?: string;
      readonly readers?: readonly string[];
    };
    readonly type: string;
  }
}
