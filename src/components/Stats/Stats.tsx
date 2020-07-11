import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { calcPercentOf } from '../../utils/stats';
import { getListStats } from '../../utils/list-filters';
import { FilterContext } from '../../context/filterContext';
import { BookContext } from '../../context/bookContext';

import './Stats.scss';

const Stats = (): h.JSX.Element => {
  const { state } = useContext(FilterContext);
  const {
    state: { books },
  } = useContext(BookContext);

  const { all = 0, read = 0, unread = 0 } = getListStats(books, state.reader);

  return (
    <aside class="stats-container">
      <div class="stats">
        <span class="stats-principal">{`${calcPercentOf(read, all)}%`}</span>
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
