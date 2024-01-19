import { createContext, useContext, createEffect } from 'solid-js';
import {createStore} from 'solid-js/store';
import type { Component, JSX } from 'solid-js';

interface IReaderProviderProps {
  readonly readers: IReader[];
  readonly children: JSX.Element;
}

type TReaderStore = [
  IReader[]
]

const ReaderContext = createContext();

const ReaderProvider: Component<IReaderProviderProps> = (props) => {
  const [readerList, setReaderList] = createStore([] as IReader[]);

  createEffect(() => setReaderList(props.readers))

  const readerStore = [readerList];
  
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