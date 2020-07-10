import { Fragment, h } from 'preact';
import { useState } from 'preact/hooks';

import List from '../List/List';
import { filterList } from '../../utils/list-filters';

import './Pages.scss';

interface IBooksProps {
  readonly list: TypeBookList;
}

const Books = ({ list }: IBooksProps): h.JSX.Element => {
  const [filter, setFilter] = useState('all');

  const handleChange = ({ currentTarget }: TypeEventSelect): void => {
    const { value } = currentTarget;

    setFilter(value);
  };

  return (
    <Fragment>
      <h2 class="sub-head">Inventory</h2>
      <label class="dropdown" for="filter">
        Filter Books By:
        <select id="filter" value={filter} onBlur={handleChange} onChange={handleChange}>
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
