import { h } from 'preact';

import './ListItem.scss';

interface IListItemProps {
  readonly item: IBook;
}

const containsReader = (arr: readonly string[], name: string): boolean => arr.includes(name);

const ListItem = ({ item }: IListItemProps): h.JSX.Element => (
  <article class="list-item">
    <i class={containsReader(item.read, 'Marek') ? 'checked-blue' : 'unchecked'} />
    <i class={containsReader(item.read, 'Jul') ? 'checked-pink' : 'unchecked'} />
    <p>
      <strong>{item.title}</strong>
      {item.author && <span>{` - ${item.author}`}</span>}
    </p>
  </article>
);

ListItem.displayName = 'ListItem';

export default ListItem;
