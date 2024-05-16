import { createContext, createEffect, createMemo, createSignal, useContext } from 'solid-js';
import {createStore} from 'solid-js/store';
import type { Component, JSX } from 'solid-js';

import { getDateString } from 'utils/dates';
import { filterRetired, getRead, getUnread } from 'utils/list-filters';
import { useReaders } from './ReaderProvider';

interface IBookProviderProps {
  readonly books: IBook[]
  readonly children: JSX.Element
}

interface IBookListObject {
  readonly name?: string
  readonly read: IBook[]
  readonly unread: IBook[]
}

interface IBookStoreState {
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
    removeBook: (id: string) => void,
    retireBook: (id: string) => void,
    updateBook: (id: string, value: IBook) => void,
  }
]

/**
 * Generates a new book object with placeholder data.
 */
const createNewBook = (): IBook => {
  return {
    author: '',
    date: getDateString(),
    read: [],
    retired: false,
    title: '',
  }
};

const BookContext = createContext();

const BookProvider: Component<IBookProviderProps> = (props) => {
  const [readerList] = useReaders();

  const [fullList, setFullList] = createStore(props.books as IBook[]);
  const [readerCount, setReaderCount] = createSignal(0);

  createEffect(() => setReaderCount(readerList.length))
  
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
        name: r.name,
        read: getRead(active, r.name, readerCount()),
        unread: getUnread(active, r.name, readerCount()),
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
          name: r.name,
          read: getRead(retired, r.name, readerCount()),
          unread: getUnread(retired, r.name, readerCount()),
        }))
      },
      fullList: {
        active,
        fullList,
        retired,
      }
    });
  }))

  /**
   * Adds new book data to the full list of books.
   * @param book The new book to add to the full list.
   */
  const addBook = (book: IBook) => {
    setFullList( [...fullList, book])
  }

  /**
   * Retrieves the data for a given book from the full list by id.
   * @param id The unique id for a given book.
   */
  const getBook = (id:string) => {
    const book = fullList.filter(b => b.id === id)

    return book[0];
  }

  /**
   * Removes the book with a given id from the full list of books.
   * @param id The unique id for a given book.
   */
  const removeBook = (id:string) => {
    setFullList( fullList.filter(b => b.id !== id) )
  }

  /**
   * Updates an existing book in the full list with new data.
   * @param id The unique id for a given book.
   * @param value The updated book data.
   */
  const updateBook = (id: string, value: IBook) => {
    const attributes = Object.entries(value).slice(1);

    attributes.forEach( attr => {
      setFullList(
        book => book.id === id,
        // @ts-ignore
        attr[0],
        attr[1]
      )
    })
  }

  const retireBook = (id: string) => {
    setFullList(
      book => book.id === id,
      // @ts-ignore
      'retired',
      true
    )
  }

  const bookStore = [
    bookList,
    {
      addBook,
      createNewBook,
      getBook,
      removeBook,
      retireBook,
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