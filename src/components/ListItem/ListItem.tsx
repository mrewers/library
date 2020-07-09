import { h } from 'preact';

import './ListItem.scss';

const ListItem = ({ item }) => (
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
