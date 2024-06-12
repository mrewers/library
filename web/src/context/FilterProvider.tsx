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
    readStatus: () => TReadStatusOptions,
    search: () => string
  },
  {
    updateReaderFilters: ( reader: string ) => void
    updateReadStatusFilter: ( readStatus: string ) => void
    updateSearchFilter: ( searchTerm: string ) => void
  }
]

/**
 * Determine whether the returned list should include items that meet any condition ('or') or only those that meet all conditions ('and').
 * @param reader The selected reader (include the collective values 'all' and 'any').
 * @returns The operator corresponding to the given reader.
 */
const setOperator = (reader: string): string => (reader === 'all' ? 'and' : 'or');

const FilterContext = createContext();

const FilterProvider: Component<IFilterProviderProps> = (props) => {
  const [filterOperator, setFilterOperator] = createSignal('or');
  const [filterReader, setFilterReader] = createSignal('any');
  const [filterReadStatus, setFilterReadStatus] = createSignal('all');
  const [filterSearch, setFilterSearch] = createSignal("")

  /**
   * Sets the reader filter on the list of books.
   * @param reader Which reader's set of books to display - those pertaining to 'any' reader, 'all' reader, or a reader with a specific id.
   */
  const updateReaderFilters = ( reader: string) => {
    setFilterReader( reader );
    setFilterOperator( setOperator( reader ));
  }

  /**
   * Sets the read status filter on the list of books.
   * @param readStatus Which set of books to display - those that are 'read', 'unread' or 'all'.
   */
  const updateReadStatusFilter = ( readStatus: TReadStatusOptions) => {
    setFilterReadStatus( readStatus );
  }

  /**
   * Sets the search filter on the list of books.
   * @param searchTerm What word or phrase to look for in the books' titles and authors.
   */
  const updateSearchFilter = ( searchTerm: string ) => {
    setFilterSearch( searchTerm );
  }

  const filterStore = [
    { 
      operator: filterOperator,
      reader: filterReader,
      readStatus: filterReadStatus,
      search: filterSearch,
    },
    {
      updateReaderFilters,
      updateReadStatusFilter,
      updateSearchFilter,
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