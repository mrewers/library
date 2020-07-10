import { Fragment, h } from 'preact';
import { useContext } from 'preact/hooks';

import Filter from '../Filter/Filter';
import List from '../List/List';
import { filterList } from '../../utils/list-filters';
import { FilterContext } from '../../context/filterContext';

import './Pages.scss';

interface IBooksProps {
  readonly list: TypeBookList;
}

const Books = ({ list }: IBooksProps): h.JSX.Element => {
  const { state } = useContext(FilterContext);

  return (
    <Fragment>
      <h2 class="sub-head">Inventory</h2>
      <Filter />
      <List list={filterList(state.type, state.reader, list)} />
    </Fragment>
  );
};

Books.displayName = 'Books';

export default Books;
