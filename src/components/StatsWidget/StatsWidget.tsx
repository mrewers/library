import type { Component } from 'solid-js';

import { calcPercentOf, getReaders } from 'utils/stats';
import { getListStats } from 'utils/list-filters';
import { useBooks } from 'context/BookProvider';
import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';

import s from './StatsWidget.module.scss';


const StatsWidget: Component = () => {
  const [bookList] = useBooks();
  const [readerList] = useReaders();
  const [filters] = useFilters();
  
  const stats = () => getListStats(bookList, filters.reader(), readerList.length);

  return (
    <aside class={s.container}>
      <div class={s.stats}>
        <div class={s.topline}>
          <span class={s.principal}>{`${calcPercentOf(stats().read, stats().all)}%`}</span>
          <span>{`Read by ${
            filters.reader() === 'all' || filters.reader() === 'any'
            ? getReaders(readerList.map(r => r.name), filters.operator())
            : filters.reader()
          }`}</span>
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
