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
 * A page that displays a list of retired books as well as controls to filter the list.
 * @returns A SolidJS JSX component.
 */
const Retired: Component = () => {
  const [bookList, { isBooksLoading }] = useBooks();
  const [filters] = useFilters();
  const [authors] = useAuthors();

  return (
    <Layout>
      <h1 class={s.subhead}>Jettisoned Books</h1>
      <div class={s.filters}>
        <Filter retired />
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
              true,
            ),
            authors,
          )
        }
        read={
          getBookSubList(
            bookList(),
            'read',
            filters.reader(),
            true,
          )
        }
        loading={isBooksLoading()}
      />
    </Layout>
  );
};


export default Retired;
