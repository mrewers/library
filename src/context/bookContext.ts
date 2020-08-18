import { createContext } from 'preact';

export const initialBookState: IBookState = {
  books: [],
  readerData: [],
  readers: [],
  retired: [],
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

const addBook = (
  books: readonly IBook[] | readonly IRetired[],
  book: IBook | IRetired
): IBook[] | IRetired[] => {
  return [...books, book];
};

const removeBook = (books: readonly IBook[], id: string): IBook[] => {
  return books.filter(book => book.id !== id);
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
    case 'ADD_RETIRED':
      return {
        ...state,
        retired: addBook(state.retired, payload.retiredBook),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: removeBook(state.books, payload.id),
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
    case 'UPDATE_RETIRED':
      return {
        ...state,
        retired: payload.retired,
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
    readonly retired: readonly IRetired[];
  }

  interface IBookAction {
    readonly payload: {
      readonly books?: readonly IBook[];
      readonly book?: IBook;
      readonly data?: readonly IReader[];
      readonly date?: string;
      readonly id?: string;
      readonly readers?: readonly string[];
      readonly retired?: readonly IRetired[];
      readonly retiredBook?: IRetired;
    };
    readonly type: string;
  }
}
