import { For } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';

import { filterList } from 'utils/list-filters';
import s from './Filter.module.scss';

const Filter: Component = () => {
  const [readerList] = useReaders();
  const [bookList] = useBooks();
  const [filters, { updateReaderFilters, updateReadStatusFilter }] = useFilters();

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
  };

  // const matches = () => filterList(
  //   filters.readStatus(), filters.reader(), readerList.length, bookList
  // ).length;
  
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
        {/* <strong>{`${matches() || 0} matches`}</strong> */}
      </span>
    </p>
  );
};

export default Filter;
