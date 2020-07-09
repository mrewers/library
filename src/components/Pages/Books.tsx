import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';

import List from '../List/List';
import { filterList } from '../../utils/list-filters';

const Books = ({ list }) => {
  const [filter, setFilter] = useState('read');

  const onChange = (e: Event) => {
    const { value } = e.target;

    setFilter(value);
  };

  return (
    <Fragment>
      <select value={filter} onChange={onChange}>
        <option value="all">All</option>
        <option value="read">Read</option>
        <option value="unread">Unread</option>
      </select>
      <List list={filterList(filter, list)} />
    </Fragment>
  );
};

export default Books;
