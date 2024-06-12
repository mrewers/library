import Filter from 'components/Filter/Filter';
import Layout from 'components/Layout/Layout';
import List from 'components/List/List';
import SearchBar from 'components/SearchBar/SearchBar';

import { useAuthors } from 'context/AuthorProvider';
import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';

import { filterSearched, getBookSubList } from 'utils/list-filters';

import type { Component } from 'solid-js';

import s from './Pages.module.scss';

/**
 * A page that displays a list of active books as well as controls to filter the list.
 * @returns A SolidJS JSX component.
 */
const Books: Component = () => {
  const [bookList, { isBooksLoading }] = useBooks();
  const [authors] = useAuthors();
  const [filters] = useFilters();

  return (
    <Layout>
      <h1 class={s.subhead}>Inventory</h1>
      <div class={s.filters}>
        <Filter />
        <SearchBar />
      </div>
      <List
        list={
          filterSearched(
            filters.search(),
            getBookSubList(
              bookList(),
              filters.readStatus(),
              filters.reader(),
            ),
            authors,
          )
        }
        read={
          getBookSubList(
            bookList(),
            'read',
            filters.reader(),
          )
        }
        loading={isBooksLoading()}
      />
    </Layout>
  )
};

export default Books;
