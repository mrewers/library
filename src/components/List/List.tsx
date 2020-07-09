import { h } from 'preact';

import ListItem from '../ListItem/ListItem';

import { mockList } from '../../../__mocks__/data';

const filterList = (filter: string, list) => {
  switch (filter) {
    case 'read':
      return list.filter((item) => item.read === true);
    case 'unread':
      return list.filter((item) => item.read === false);
    default:
      return list;
  }
};

const List = ({ filter }: { filter: string }) => {
  const list = filterList(filter, mockList);

  return (
    <section>
      {list.map((item) => (
        <ListItem title={item.title} />
      ))}
    </section>
  );
};

export default List;
