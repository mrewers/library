import type { Component } from 'solid-js';

import Filter from 'components/Filter/Filter';
import Layout from 'components/Layout/Layout';
import List from 'components/List/List';

import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';
import { fetchData } from 'utils/api';
import { filterList, getRead } from 'utils/list-filters';

import s from './Pages.module.scss';

import { mockBooks } from 'mocks/data';

const Retired: Component = () => {
  const [filters] = useFilters();
  const [readerList] = useReaders();

  const retired = mockBooks;

  // useEffect(() => {
  //   // Fetch reader data
  //   fetchData('retired')
  //     .then((data: IRetiredResponse) =>
  //       dispatch({ type: 'UPDATE_RETIRED', payload: { retired: data.retired } })
  //     )
  //     .catch(err => console.error(err));
  // }, [dispatch]);

  const count = readerList.length;

  return (
    <Layout>
      <h1 class={s.subhead}>Jettisoned Books</h1>
      <Filter />
      <List
        list={filterList(filters.readStatus(), filters.reader(), count, retired)}
        read={getRead(retired, filters.reader(), count)}
      />
    </Layout>
  );
};

export default Retired;
