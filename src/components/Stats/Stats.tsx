import { h } from 'preact';

import { getListStats } from '../../utils/list-filters';

import './Stats.scss';

const Stats = ({ list }) => {
  const { all, read, unread } = getListStats(list);

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

export default Stats;
