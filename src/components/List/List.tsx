import { h } from 'preact';

import ListItem from '../ListItem/ListItem';

import './List.scss';

const List = ({ list }: { list: any }) => (
  <section>
    <ul class="book-list">
      {list.map((item) => (
        <li class={item.read ? 'read' : ''}>
          <ListItem item={item} />
        </li>
      ))}
    </ul>
  </section>
);

List.displayName = 'List';

export default List;
