import { Fragment, h } from 'preact';
import { useContext, useEffect } from 'preact/hooks';

import Filter from '~/components/Filter/Filter';
import List from '~/components/List/List';

import { BookContext } from '~/context/bookContext';
import { fetchData } from '~/utils/api';
import { FilterContext } from '~/context/filterContext';
import { filterList, getRead } from '~/utils/list-filters';

import s from './Pages.scss';

const Retired = (): h.JSX.Element => {
  const {
    state: { status, reader },
  } = useContext(FilterContext);

  const {
    dispatch,
    state: { retired, readers },
  } = useContext(BookContext);

  useEffect(() => {
    // Fetch reader data
    fetchData('retired')
      .then((data: IRetiredResponse) =>
        dispatch({ type: 'UPDATE_RETIRED', payload: { retired: data.retired } })
      )
      .catch(err => console.error(err));
  }, [dispatch]);

  const count = readers.length;

  return (
    <Fragment>
      <h2 class={s.subhead}>Jettisoned Books</h2>
      <Filter />
      <List
        list={filterList(status, reader, count, retired)}
        read={getRead(retired, reader, count)}
      />
    </Fragment>
  );
};

Retired.displayName = 'Retired';

export default Retired;
