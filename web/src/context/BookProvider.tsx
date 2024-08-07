import { createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import {createStore} from 'solid-js/store';

import { useReaders } from './ReaderProvider';

import { getDateString } from 'utils/dates';
import { filterRetired, getRead, getUnread } from 'utils/list-filters';

import type { Component, JSX } from 'solid-js';

interface IBookProviderProps {
  readonly books: IBook[]
  readonly loading: boolean
  readonly children: JSX.Element
}

interface IBookListObject {
  readonly id?: string
  readonly name?: string
  readonly read: IBook[]
  readonly unread: IBook[]
}

export interface IBookStoreState {
  readonly all: IBookListObject
  readonly any: IBookListObject
  readonly filtered: IBookListObject[]
  readonly retired: {
    readonly all: IBookListObject
    readonly any: IBookListObject
    readonly filtered: IBookListObject[]
  }
  readonly fullList: {
    readonly active: IBook[]
    readonly fullList: IBook[]
    readonly retired: IBook[]
  }
}

type TBookStore = [
  () => IBookStoreState,
  {
    addBook: (book: IBook) => void,
    createNewBook: () => IBook,
    getBook: (id: string) => IBook,
    initialBookState: () => IBook,
    isBooksLoading: () => boolean,
    removeBook: (id: string) => void,
    updateBook: (id: string, value: IBook) => void,
  }
]

/**
 * Creates a blank book.
 * @returns A book placeholder object.
 */
const initialBookState = () => ({
  author: [],
  dateAcquired: getDateString(),
  readBy: [],
  retired: false,
  title: '',
});

/**
 * Generates a new book object with placeholder data.
 */
const createNewBook = (): IBook => {
  return initialBookState();
};

const BookContext = createContext();

const BookProvider: Component<IBookProviderProps> = (props) => {
  const [readerList] = useReaders();
  const [readerCount, setReaderCount] = createSignal(0);

  const [isBooksLoading, setIsBooksLoading] = createSignal(true);
  const [fullList, setFullList] = createStore([] as IBook[]);

  createEffect(() => setReaderCount(readerList.length));

  createEffect(() => setFullList(props.books));

  createEffect(() => setIsBooksLoading(props.loading));

  const [bookList] = createStore(createMemo(() => {
    const [active, retired] = filterRetired(fullList);

    return ({
      all: {
        read: getRead(active, 'all', readerCount()),
        unread: getUnread(active, 'all', readerCount()),
      },
      any: {
        read: getRead(active, 'any', readerCount()),
        unread: getUnread(active, 'any', readerCount()),
      },
      filtered: readerList.map(r => ({
        id: r.id,
        name: r.name,
        read: getRead(active, r.id, readerCount()),
        unread: getUnread(active, r.id, readerCount()),
      })),
      retired: {
        all: {
          read: getRead(retired, 'all', readerCount()),
          unread: getUnread(retired, 'all', readerCount()),
        },
        any: {
          read: getRead(retired, 'any', readerCount()),
          unread: getUnread(retired, 'any', readerCount()),
        },
        filtered: readerList.map(r => ({
          id: r.id,
          name: r.name,
          read: getRead(retired, r.id, readerCount()),
          unread: getUnread(retired, r.id, readerCount()),
        }))
      },
      fullList: {
        active,
        fullList,
        retired,
      }
    });
  }));

  /**
   * Adds new book data to the full list of books.
   * @param book The new book to add to the full list.
   */
  const addBook = (book: IBook) => {
    setFullList( [...fullList, book]);
  }

  /**
   * Retrieves the data for a given book from the full list by id.
   * @param id The unique id for a given book.
   */
  const getBook = async (id:string) => {
    const book = fullList.find(b => b.id === id);

    if (book) {
      return book;
    }

    return initialBookState();
  };

  /**
   * Removes the book with a given id from the full list of books.
   * @param id The unique id for a given book.
   */
  const removeBook = (id:string) => {
    setFullList( fullList.filter(b => b.id !== id) );
  }

  /**
   * Updates an existing book in the full list with new data.
   * @param id The unique id for a given book.
   * @param value The updated book data.
   */
  const updateBook = (id: string, value: IBook) => {
    const attributes = Object.entries(value);

    attributes.forEach( attr => {
      setFullList(
        book => book.id === id,
        // @ts-ignore
        attr[0],
        attr[1]
      )
    });
  }

  const bookStore = [
    bookList,
    {
      addBook,
      createNewBook,
      getBook,
      initialBookState,
      isBooksLoading,
      removeBook,
      updateBook,
    }
  ]

  return (
    <BookContext.Provider value={bookStore}>
      {props.children}
    </BookContext.Provider>
  )
}

const useBooks = () => useContext(BookContext) as TBookStore;

export {
  BookProvider,
  useBooks
};