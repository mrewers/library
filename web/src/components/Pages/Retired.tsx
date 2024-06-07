import type { Component } from 'solid-js';
import { createStore } from 'solid-js/store';

import Filter from 'components/Filter/Filter';
import Layout from 'components/Layout/Layout';
import List from 'components/List/List';

import { useFilters } from 'context/FilterProvider';
import { useBooks } from 'context/BookProvider';

import s from './Pages.module.scss';

const Retired: Component = () => {
  const [bookList, { isBooksLoading }] = useBooks();
  const [filters] = useFilters();

  const [readList] = createStore(() => {
    if ( filters.reader() === 'all' || filters.reader() === 'any' ) {
      return filters.reader();
    }
    
    return bookList().retired.filtered.findIndex(i => i.id === filters.reader());
  });

  return (
    <Layout>
      <h1 class={s.subhead}>Jettisoned Books</h1>
      <Filter retired />
      <List
        list={
          filters.readStatus() === 'all'
          ? bookList().fullList.retired
          : typeof readList() === 'number'
            ? bookList().retired.filtered[readList() as number][filters.readStatus() as 'read' | 'unread']
            : bookList().retired[readList() as 'all' | 'any'][filters.readStatus() as 'read' | 'unread']
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
