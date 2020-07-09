import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';

import List from '../List/List';
import { filterList } from '../../utils/list-filters';

import './Pages.scss';

const Books = ({ list }) => {
  const [filter, setFilter] = useState('all');

  const onChange = (e: Event) => {
    const { value } = e.target;

    setFilter(value);
  };

  return (
    <Fragment>
      <h2 class="sub-head">Inventory</h2>
      <label class="dropdown" for="filter">
        Filter Books By:
        <select id="filter" value={filter} onChange={onChange}>
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
      </label>
      <List list={filterList(filter, list)} />
    </Fragment>
  );
};

Books.displayName = 'Books';

export default Books;
