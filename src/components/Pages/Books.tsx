import { Fragment, h } from 'preact';
import { useContext } from 'preact/hooks';

import Filter from '../Filter/Filter';
import List from '../List/List';
import { filterList } from '../../utils/list-filters';
import { FilterContext } from '../../context/filterContext';
import { BookContext } from '../../context/bookContext';

import './Pages.scss';

const Books = (): h.JSX.Element => {
  const { state } = useContext(FilterContext);
  const {
    state: { books },
  } = useContext(BookContext);

  return (
    <Fragment>
      <h2 class="sub-head">Inventory</h2>
      <Filter />
      <List list={filterList(state.type, state.reader, books)} />
    </Fragment>
  );
};

Books.displayName = 'Books';

export default Books;
