import type { Component } from 'solid-js';
import {createEffect, Show} from 'solid-js'

import Filter from 'components/Filter/Filter';
import Layout from 'components/Layout/Layout';
import List from 'components/List/List';
import { filterList, getRead } from 'utils/list-filters';
import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';

import s from './Pages.module.scss';

const Books: Component = () => {
  const [booksList] = useBooks();
  const [readerList] = useReaders();
  const [filters] = useFilters();

  const count = readerList.length;
  
  const list = () => filterList(filters.readStatus(), filters.reader(), count, booksList);
  const read = () => getRead(booksList, filters.reader(), count);

  return (
    <Layout>
      <h1 class={s.subhead}>Inventory</h1>
      <Filter />
      <Show when={booksList.length > 0 && readerList.length > 0}>
        <List
          list={list()}
          read={read()}
        />
      </Show>
    </Layout>
  )
};

export default Books;
