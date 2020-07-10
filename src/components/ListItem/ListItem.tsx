import { h } from 'preact';

import './ListItem.scss';

interface IListItemProps {
  readonly item: IBook;
}

const ListItem = ({ item }: IListItemProps): h.JSX.Element => (
  <article class="list-item">
    <i class={item.read ? 'checked' : 'unchecked'} />
    <p>
      <strong>{item.title}</strong>
      {item.author && <span>{` - ${item.author}`}</span>}
    </p>
  </article>
);

ListItem.displayName = 'ListItem';

export default ListItem;
