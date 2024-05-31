import { Show } from 'solid-js'
import { createStore } from 'solid-js/store';

import Filter from 'components/Filter/Filter';
import Layout from 'components/Layout/Layout';
import List from 'components/List/List';

import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';

import type { Component } from 'solid-js';

import s from './Pages.module.scss';

const Books: Component = () => {
  const [bookList, { isBooksLoading }] = useBooks();
  const [filters] = useFilters();

  const [readList] = createStore(() => {
    if ( filters.reader() === 'all' || filters.reader() === 'any' ) {
      return filters.reader();
    }
    
    return bookList().filtered.findIndex(i => i.id === filters.reader());
  });

  return (
    <Layout>
      <h1 class={s.subhead}>Inventory</h1>
      <Filter />
      <Show when={bookList().fullList.active.length > 0}>
        <List
          list={
            filters.readStatus() === 'all'
            ? bookList().fullList.active
            : typeof readList() === 'number'
              ? bookList().filtered[readList() as number][filters.readStatus() as 'read' | 'unread']
              : bookList()[readList() as 'all' | 'any'][filters.readStatus() as 'read' | 'unread']
          }
          read={
            typeof readList() === 'number' 
            ? bookList().filtered[readList() as number].read
            : bookList()[readList() as 'all' | 'any'].read
          }
          loading={isBooksLoading()}
        />
      </Show>
    </Layout>
  )
};

export default Books;
