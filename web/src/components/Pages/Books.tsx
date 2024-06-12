import { createStore } from 'solid-js/store';

import Filter from 'components/Filter/Filter';
import Layout from 'components/Layout/Layout';
import List from 'components/List/List';
import SearchBar from 'components/SearchBar/SearchBar';

import { useAuthors } from 'context/AuthorProvider';
import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';

import { pickBookSubList, filterSearched } from 'utils/list-filters';

import type { Component } from 'solid-js';

import s from './Pages.module.scss';

const Books: Component = () => {
  const [bookList, { isBooksLoading }] = useBooks();
  const [authors] = useAuthors();
  const [filters] = useFilters();

  const [readList] = createStore(() => {
    if ( filters.reader() === 'all' || filters.reader() === 'any' ) {
      return filters.reader() as 'all' || 'any';
    }

    return bookList().filtered.findIndex(i => i.id === filters.reader());
  });

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
            pickBookSubList(
              bookList(),
              filters.readStatus(),
              readList(),
            ),
            authors,
          )
        }
        read={
          typeof readList() === 'number'
          ? bookList().filtered[readList() as number].read
          : bookList()[readList() as 'all' | 'any'].read
        }
        loading={isBooksLoading()}
      />
    </Layout>
  )
};

export default Books;
