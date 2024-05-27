import { createContext, createEffect, createSignal, useContext } from 'solid-js';
import {createStore} from 'solid-js/store';
import type { Component, JSX } from 'solid-js';

import { generateUuid } from 'utils/crypto';

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
  }
]

/**
 * Generates a new author object with placeholder data.
 */
const createNewAuthor = (): IAuthor => {
  return {
    id: generateUuid(),
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

  const authorStore = [
    authorList,
    {
      addAuthor,
      createNewAuthor,
      deleteAuthor,
      getAuthor,
      isAuthorsLoading,
      updateAuthor,
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