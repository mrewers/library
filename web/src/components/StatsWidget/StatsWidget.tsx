import { Show } from 'solid-js';
import { useLocation } from "@solidjs/router";

import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';

import { calcPercentOf, getReaders } from 'utils/stats';
import { getListStats } from 'utils/list-filters';
import { getReaderName } from 'utils/readers';

import type { Component } from 'solid-js';

import s from './StatsWidget.module.scss';

const StatsWidget: Component = () => {
  const [bookList] = useBooks();
  const [readerList] = useReaders();
  const [filters] = useFilters();

  const location = useLocation();

  const list = location.pathname === '/retired' ? 'retired' : 'active';
  
  const stats = () => getListStats(bookList().fullList[list], filters.reader(), readerList.length);

  const getReadBy = (selected: string) => {
    const readBy = selected === 'all' || selected === 'any'
      ? getReaders(readerList.map(r => r.name), filters.operator())
      : getReaderName(filters.reader(), readerList);

    return readBy;
  }

  return (
    <aside class={s.container}>
      <div class={s.stats}>
        <div class={s.topline}>
          <Show when={filters.readStatus() === 'read' || filters.readStatus() === 'all'}>
            <span class={s.principal}>{`${calcPercentOf(stats().read, stats().all)}%`}</span>
            <span>{`Read by ${getReadBy(filters.reader())}`}</span>
          </Show>
          <Show when={filters.readStatus() === 'unread'}>
            <span class={s.principal}>{`${calcPercentOf(stats().unread, stats().all)}%`}</span>
            <span>{`Unread by ${getReadBy(filters.reader())}`}</span>
          </Show>
        </div>
        <div class={s.pair}>
          <span class={s.secondary}>{`Read: ${stats().read}`}</span>
          <span class={s.secondary}>{`Unread: ${stats().unread}`}</span>
        </div>
        <span class={s.secondary}>{`Total: ${stats().all}`}</span>
      </div>
    </aside>
  );
};

export default StatsWidget;
