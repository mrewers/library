import { h } from 'preact';

import ListItem from '../ListItem/ListItem';

import './List.scss';

interface IListProps {
  readonly list: TypeBookList;
}

const List = ({ list }: IListProps): h.JSX.Element => (
  <section>
    {list.length === 0 && <div class="loader">Loading...</div>}
    {list.length > 0 && (
      <ul class="book-list">
        {list.map(item => (
          <li key={item.title} class={item.read.length !== 0 ? 'read' : ''}>
            <ListItem item={item} />
          </li>
        ))}
      </ul>
    )}
  </section>
);

List.displayName = 'List';

export default List;
