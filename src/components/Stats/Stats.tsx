import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { getListStats } from '../../utils/list-filters';
import { FilterContext } from '../../context/filterContext';

import './Stats.scss';

interface IStatsProps {
  readonly list: TypeBookList;
}

const Stats = ({ list }: IStatsProps): h.JSX.Element => {
  const { state } = useContext(FilterContext);

  const { all, read, unread } = getListStats(list, state.reader);

  return (
    <aside class="stats-container">
      <div class="stats">
        <span class="stats-principal">{`${Math.round((read / all) * 100)}%`}</span>
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
