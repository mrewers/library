import { createContext, useContext, createEffect } from 'solid-js';
import {createStore} from 'solid-js/store';
import type { Component, JSX } from 'solid-js';

import { generateUuid } from 'utils/crypto';

interface IReaderProviderProps {
  readonly readers: IReader[];
  readonly children: JSX.Element;
}

type TReaderStore = [
  IReader[],
  {
    addReader: (reader: IReader) => void,
    createNewReader: () => IReader,
    getReader: (id: string) => IReader,
    updateReader: (id: string, value: IReader) => void,
  }
]

/**
 * Generates a new reader object with placeholder data.
 */
const createNewReader = (): IReader => {
  return {
    color: '',
    id: generateUuid(),
    name: '',
  }
};

const ReaderContext = createContext();

const ReaderProvider: Component<IReaderProviderProps> = (props) => {
  const [readerList, setReaderList] = createStore([] as IReader[]);

  createEffect(() => {
    setReaderList(props.readers);
  })

  /**
   * Adds new reader data to the list of readers.
   * @param reader The new reader to add to the list.
   */
  const addReader = (reader: IReader) => {
    setReaderList( [...readerList, reader] );
  }

  /**
   * Retrieves the data for a given reader from the reader list by id.
   * @param id The unique id for a given reader.
   */
  const getReader = (id:string) => {
    const reader = readerList.filter(r => r.id === id);

    return reader[0];
  }

  /**
   * Updates an existing reader in the list with new data.
   * @param id The unique id for a given reader.
   * @param value The updated reader data.
   */
  const updateReader = (id: string, value: IReader) => {
    const attributes = Object.entries(value);

    attributes.forEach( attr => {
      setReaderList(
        reader => reader.id === id,
        // @ts-ignore
        attr[0],
        attr[1]
      )
    });
  }

  const readerStore = [
    readerList,
    {
      addReader,
      createNewReader,
      getReader,
      updateReader,
    }
  ];
  
  return (
    <ReaderContext.Provider value={readerStore}>
      {props.children}
    </ReaderContext.Provider>
  );
};

const useReaders = () => useContext(ReaderContext) as TReaderStore;

export {
  ReaderProvider,
  useReaders
};