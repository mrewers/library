import { createEffect, createSignal, For } from 'solid-js';

import { useAuthors } from 'context/AuthorProvider';
import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';

import { filterSearched, getBookSubList } from 'utils/list-filters';

import type { Component, JSX } from 'solid-js';

import s from './Filter.module.scss';

interface IFilterProps {
  readonly retired?: boolean
}

/**
 * A set of dropdowns to used to update the criteria used by the filter context to narrow down the list of books.
 * @param props.retired Optional - whether the filters should operate on the retired book list (as opposed to the active list).
 * @returns A SolidJS JSX component.
 */
const Filter: Component<IFilterProps> = (props) => {
  const [readerList] = useReaders();
  const [bookList] = useBooks();
  const [authors] = useAuthors();

  const [filters, { updateReaderFilters, updateReadStatusFilter }] = useFilters();
  const [matches, setMatches] = createSignal(0)

  /**
   * Update matches count as the user adjusts the selected filters.
   * @returns A count of books that match the selected filter criteria.
   */
  const updateMatches = () => {
    const subList = filterSearched(
      filters.search(),
      getBookSubList(bookList(), filters.readStatus(), filters.reader(), props.retired),
      authors,
    );

    setMatches(subList.length)
  }

  // Initialize the match count on page load.
  createEffect(() => updateMatches() );

  /**
   * Update the UI based on the filters selected by the user.
   * @param e.currentTarget The onChange event for a select element.
   */
  const handleChange = ({ currentTarget }: Event): void => {
    if (currentTarget === null) {
      return;
    }

    const { name, value } = currentTarget as HTMLSelectElement;

    if ( name === 'read-status' ) {
      updateReadStatusFilter( value );
    }

    if ( name === 'reader' ) {
      updateReaderFilters( value );
    }

    updateMatches();
  };
  
  return (
    <p class={s.container}>
      <label class={s.dropdown} for="filter-read-status">
        <span>Show</span>
        <select
          id="filter-read-status"
          name="read-status"
          value={filters.readStatus()}
          onChange={handleChange}
        >
          <option value="all">All Books</option>
          <option value="read">Read Books</option>
          <option value="unread">Unread Books</option>
        </select>
      </label>
      <label class={s.dropdown} for="filter-reader">
        <span>For</span>
        <select
          id="filter-reader"
          name="reader"
          value={filters.reader()}
          onChange={handleChange}
        >
          <option value="any">Any Reader</option>
          <option value="all">All Readers</option>
          <For each={readerList}>
            { (r): JSX.Element => (
              <option value={r.id}>
                {r.name}
              </option>
            ) }
          </For>
        </select>
      </label>
      <span>
        <strong>{`${matches() || 0} matches`}</strong>
      </span>
    </p>
  );
};

export default Filter;
