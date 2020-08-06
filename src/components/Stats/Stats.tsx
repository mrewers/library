import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { calcPercentOf, getReaders } from '~/utils/stats';
import { getListStats } from '~/utils/list-filters';
import { FilterContext } from '~/context/filterContext';
import { BookContext } from '~/context/bookContext';

import s from './Stats.scss';

const Stats = (): h.JSX.Element => {
  const {
    state: { operator, reader },
  } = useContext(FilterContext);

  const {
    state: { books, readers },
  } = useContext(BookContext);

  const { all = 0, read = 0, unread = 0 } = getListStats(books, reader, readers.length);

  return (
    <aside class={s.container}>
      <div class={s.stats}>
        <div class={s.topline}>
          <span class={s.principal}>{`${calcPercentOf(read, all)}%`}</span>
          <span>{`Read by ${
            reader === 'all' || reader === 'any' ? getReaders(readers, operator) : reader
          }`}</span>
        </div>
        <div class={s.pair}>
          <span class={s.secondary}>{`Read: ${read}`}</span>
          <span class={s.secondary}>{`Unread: ${unread}`}</span>
        </div>
        <span class={s.secondary}>{`Total: ${all}`}</span>
      </div>
    </aside>
  );
};

Stats.displayName = 'Stats';

export default Stats;
