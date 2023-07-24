import { createContext, createSignal, useContext } from 'solid-js';
import type { Component, JSX } from 'solid-js';

interface IFilterProviderProps {
  readonly children: JSX.Element;
}

type TReadStatusOptions = 'all' | 'read' | 'unread';

type TFilterStore = [
  {
    operator: () => string,
    reader: () => string,
    readStatus: () => string,
  },
  {
    updateReaderFilters: ( reader: string ) => void
    updateReadStatusFilter: ( readStatus: string ) => void
  }
]

const setOperator = (reader: string): string => (reader === 'all' ? 'and' : 'or');

const FilterContext = createContext();

const FilterProvider: Component<IFilterProviderProps> = (props) => {
  const [filterOperator, setFilterOperator] = createSignal('and');
  const [filterReader, setFilterReader] = createSignal('all');
  const [filterReadStatus, setFilterReadStatus] = createSignal('all');

  const updateReaderFilters = ( reader: string) => {
    setFilterReader( reader );
    setFilterOperator( setOperator( reader ));
  }

  const updateReadStatusFilter = ( readStatus: TReadStatusOptions) => {
    setFilterReadStatus( readStatus );
  }

  const filterStore = [
    { 
      operator: filterOperator,
      reader: filterReader,
      readStatus: filterReadStatus,
    },
    {
      updateReaderFilters,
      updateReadStatusFilter
    }
  ];
  
  return (
    <FilterContext.Provider value={filterStore}>
      {props.children}
    </FilterContext.Provider>
  );
};

const useFilters = () => useContext(FilterContext) as TFilterStore;

export {
  FilterProvider,
  useFilters
};