import { createContext, useContext, createEffect } from 'solid-js';
import {createStore} from 'solid-js/store';
import type { Component, JSX } from 'solid-js';

import { getDateString } from 'utils/dates';

interface IBookProviderProps {
  readonly books: IBook[];
  readonly children: JSX.Element;
}

type TBookStore = [
  IBook[],
  {
    addBook: (book: IBook) => void,
    createNewBook: () => IBook,
    getBook: (id: string) => IBook,
    removeBook: (id: string) => void,
    updateBook: (id: string, value: IBook) => void,
  }
]

const createNewBook = (): IBook => {
  return {
    acquired: false,
    author: '',
    date: getDateString(),
    read: [],
    title: '',
  }
};

const BookContext = createContext();

const BookProvider: Component<IBookProviderProps> = (props) => {
  const [bookList, setBookList] = createStore([] as IBook[]);

  createEffect(() => setBookList(props.books))

  const addBook = (book: IBook) => {
    setBookList( [...bookList, book])
  }

  const getBook = (id:string) => {
    const book = bookList.filter(b => b.id === id)

    return book[0];
  }

  const removeBook = (id:string) => {
    setBookList( bookList.filter(b => b.id !== id) )
  }

  const updateBook = (id: string, value: IBook) => {
    const attributes = Object.entries(value).slice(1);

    attributes.forEach( attr => {
      setBookList(
        book => book.id === id,
        attr[0],
        attr[1]
      )
    })
  }

  const bookStore = [
    bookList,
    {
      addBook,
      createNewBook,
      getBook,
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