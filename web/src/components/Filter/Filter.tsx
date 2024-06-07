import { createEffect, createSignal, For } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';

import s from './Filter.module.scss';

interface IFilterProps {
  readonly retired?: boolean
}

const Filter: Component<IFilterProps> = (props) => {
  const [readerList] = useReaders();
  const [bookList] = useBooks();
  const [filters, { updateReaderFilters, updateReadStatusFilter }] = useFilters();
  const [matches, setMatches] = createSignal(0)

  /**
   * Update matches count as the user adjusts the selected filters.
   * @returns A count of books that match the selected filter criteria.
   */
  const updateMatches = () => {
    const activeStatus = props.retired ? 'retired' : 'active';
    const reader = filters.reader();
    const readStatus = filters.readStatus() as "all" | "read" | "unread";

    if (readStatus === 'all' ) {
      setMatches(bookList().fullList[activeStatus].length);
      return;
    }

    const mainList = props.retired ? bookList().retired : bookList();

    let subList = [];

    if ( reader === 'all' || reader === 'any' ) {
      subList = mainList[reader][readStatus];
    } else {
      const personalList = mainList.filtered.find(i => i.id === reader);

      if (personalList) {
        subList = personalList[readStatus];
      }
    }

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

    if (name === 'read-status' && typeof value === 'string') {
      updateReadStatusFilter( value )
    }

    if (name === 'reader' && typeof value === 'string') {
      updateReaderFilters( value );
    }

    updateMatches();
  };
  
  return (
    <p class={s.container}>
      <span>
        Show
        <label class={s.dropdown} for="filter-read-status">
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
      </span>
      <span>
        For
        <label class={s.dropdown} for="filter-reader">
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
      </span>
      <span>
        <strong>{`${matches() || 0} matches`}</strong>
      </span>
    </p>
  );
};

export default Filter;
