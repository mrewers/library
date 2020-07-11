import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { getListStats } from '../../utils/list-filters';
import { FilterContext } from '../../context/filterContext';
import { BookContext } from '../../context/bookContext';

import './Stats.scss';

const Stats = (): h.JSX.Element => {
  const { state } = useContext(FilterContext);
  const {
    state: { books },
  } = useContext(BookContext);

  const { all, read, unread } = getListStats(books, state.reader);

  const calcRead = (r: number, a: number): number => {
    if (r === 0 || a === 0) return 0;

    return Math.round((r / a) * 100);
  };

  return (
    <aside class="stats-container">
      <div class="stats">
        <span class="stats-principal">{`${calcRead(read, all)}%`}</span>
        <div class="stats-pair">
          <span class="stats-secondary">{`Read: ${read}`}</span>
          <span class="stats-secondary">{`Unread: ${unread}`}</span>
        </div>
        <span class="stats-secondary">{`Total: ${all}`}</span>
      </div>
    </aside>
  );
};

Stats.displayName = 'Stats';

export default Stats;
