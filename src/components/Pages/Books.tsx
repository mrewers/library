import { Fragment, h } from 'preact';
import { useContext } from 'preact/hooks';

import s from './Pages.module.scss';

import Filter from 'components/Filter/Filter';
import List from 'components/List/List';
import { BookContext } from 'context/bookContext';
import { FilterContext } from 'context/filterContext';
import { filterList, getRead } from 'utils/list-filters';

const Books = (): h.JSX.Element => {
  const {
    state: { status, reader },
  } = useContext(FilterContext);

  const {
    state: { books, readers },
  } = useContext(BookContext);

  const count = readers.length;

  return (
    <Fragment>
      <h2 class={s.subhead}>Inventory</h2>
      <Filter />
      <List list={filterList(status, reader, count, books)} read={getRead(books, reader, count)} />
    </Fragment>
  );
};

Books.displayName = 'Books';

export default Books;
