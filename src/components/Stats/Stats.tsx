import { h } from 'preact';

import { getListStats } from '../../utils/list-filters';

const Stats = ({ list }) => {
  const stats = getListStats(list);
  return (
    <article>
      <div>{`Read: ${stats.read}`}</div>
      <div>{`Unread: ${stats.unread}`}</div>
      <div>{`Total: ${stats.all}`}</div>
    </article>
  );
};

export default Stats;
