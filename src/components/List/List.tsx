import { h } from 'preact';

import ListItem from '../ListItem/ListItem';

import './List.scss';

interface IListProps {
  readonly list: TypeBookList;
}

const List = ({ list }: IListProps): h.JSX.Element => (
  <section>
    <ul class="book-list">
      {list.map(item => (
        <li key={item.title} class={item.read ? 'read' : ''}>
          <ListItem item={item} />
        </li>
      ))}
    </ul>
  </section>
);

List.displayName = 'List';

export default List;
