import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';

import Filter from 'components/Filter/Filter';
import Layout from 'components/Layout/Layout';
import List from 'components/List/List';
import SearchBar from 'components/SearchBar/SearchBar';

import { useAuthors } from 'context/AuthorProvider';
import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';

import { pickBookSubList, filterSearched } from 'utils/list-filters';

import s from './Pages.module.scss';

const Retired: Component = () => {
  const [bookList, { isBooksLoading }] = useBooks();
  const [filters] = useFilters();
  const [authors] = useAuthors();

  const [readList] = createStore(() => {
    if ( filters.reader() === 'all' || filters.reader() === 'any' ) {
      return filters.reader() as 'all' || 'any';
    }
    
    return bookList().retired.filtered.findIndex(i => i.id === filters.reader());
  });

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
            pickBookSubList(
              bookList(),
              filters.readStatus(),
              readList(),
              true,
            ),
            authors,
          )
        }
        read={
          typeof readList() === 'number' 
          ? bookList().retired.filtered[readList() as number].read
          : bookList().retired[readList() as 'all' | 'any'].read
        }
        loading={isBooksLoading()}
      />
    </Layout>
  );
};


export default Retired;
