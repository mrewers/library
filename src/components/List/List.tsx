import { h } from 'preact';

import ListItem from '../ListItem/ListItem';

const List = ({ list }: { list: any }) => (
  <section>
    {list.map((item) => (
      <ListItem title={item.title} />
    ))}
  </section>
);

export default List;
