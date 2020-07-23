import { h } from 'preact';

import ListItem from '~/components/ListItem/ListItem';

import './List.scss';

interface IListProps {
  readonly list: TypeBookList;
  readonly read: TypeBookList;
}

const List = ({ list, read }: IListProps): h.JSX.Element => (
  <section>
    {list.length === 0 && <div class="loader">Loading...</div>}
    {list.length > 0 && (
      <ul class="book-list">
        {list.map(item => (
          <li key={item.id} class={read.includes(item) ? 'read' : ''}>
            <ListItem item={item} />
          </li>
        ))}
      </ul>
    )}
  </section>
);

List.displayName = 'List';

export default List;
