import { createContext, createEffect, createSignal, useContext } from 'solid-js';
import {createStore} from 'solid-js/store';

import { generateUuid } from 'utils/crypto';
import { buildQuery } from 'utils/api';

import type { Component, JSX } from 'solid-js';

interface IAuthorProviderProps {
  readonly loading: boolean;
  readonly authors: IAuthor[];
  readonly children: JSX.Element;
}

type TAuthorStore = [
  IAuthor[],
  {
    addAuthor: (author: IAuthor) => void,
    createNewAuthor: () => IAuthor,
    deleteAuthor: (id: string) => void,
    getAuthor: (id: string) => IAuthor,
    isAuthorsLoading: () => boolean,
    updateAuthor: (id: string, value: IAuthor) => void,
    updateAuthorBooks: (id: string, bookId: string) => void,
  }
]

/**
 * Generates a new author object with placeholder data.
 */
const createNewAuthor = (): IAuthor => {
  return {
    id: generateUuid(),
    books: [],
    nameFirst: '',
    nameLast: '',
  }
};

const AuthorContext = createContext();

const AuthorProvider: Component<IAuthorProviderProps> = (props) => {
  const [isAuthorsLoading, setIsAuthorsLoading] = createSignal(true);
  const [authorList, setAuthorList] = createStore([] as IAuthor[]);

  createEffect(() => setAuthorList(props.authors));

  createEffect(() => setIsAuthorsLoading(props.loading));

  /**
   * Adds new author data to the list of authors.
   * @param author The new author to add to the list.
   */
  const addAuthor = (author: IAuthor) => {
    setAuthorList( [...authorList, author] );
  }

  /**
   * Removes a given author from the list of authors.
   * @param id The id of the author to remove.
   */
  const deleteAuthor = (id: string) => {
    const updatedList = authorList.filter( a => a.id !== id );

    setAuthorList( updatedList );
  }

  /**
   * Retrieves the data for a given author from the author list by id.
   * @param id The unique id for a given author.
   */
  const getAuthor = (id:string) => authorList.find(a => a.id === id);

  /**
   * Updates an existing author in the list with new data.
   * @param id The unique id for a given author.
   * @param value The updated author data.
   */
  const updateAuthor = (id: string, value: IAuthor) => {
    const attributes = Object.entries(value);

    attributes.forEach( attr => {
      setAuthorList(
        author => author.id === id,
        // @ts-ignore
        attr[0],
        attr[1]
      )
    });
  }

  /**
   * Updates the list of books associated with an existing author in the list.
   * If the author's list of books already contains the provided book it is
   * removed, otherwise it is added.
   * @param id The author's unique identifier.
   * @param bookId The unique identifier of a book.
   */
  const updateAuthorBooks = async ( id: string, bookId: string ) => {
    const author = authorList.find(a => a.id === id);

    if ( !author?.books ) {
      await buildQuery(`author?id=${id}`, {books: [bookId]}, 'PATCH')

      setAuthorList(
        author => author.id === id,
        // @ts-ignore
        'books',
        [bookId],
      );

      return;
    }

    let update = [...author.books];

    if ( update.includes( bookId ) ) {
      update.splice( update.indexOf( bookId ) );
    } else {
      update.push( bookId );
    }

    await buildQuery(`author?id=${id}`, {books: update}, 'PATCH')

    setAuthorList(
      author => author.id === id,
      // @ts-ignore
      'books',
      update,
    );
  }

  const authorStore = [
    authorList,
    {
      addAuthor,
      createNewAuthor,
      deleteAuthor,
      getAuthor,
      isAuthorsLoading,
      updateAuthor,
      updateAuthorBooks,
    }
  ];
  
  return (
    <AuthorContext.Provider value={authorStore}>
      {props.children}
    </AuthorContext.Provider>
  );
};

const useAuthors = () => useContext(AuthorContext) as TAuthorStore;

export {
  AuthorProvider,
  useAuthors
};