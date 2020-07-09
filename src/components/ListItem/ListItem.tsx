import { h } from 'preact';

import './ListItem.scss';

const ListItem = ({ item }) => (
  <article class="list-item">
    <i class={item.read ? 'checked' : 'unchecked'}></i>
    <p>
      <strong>{item.title}</strong>
      {item.author && <span>{` - ${item.author}`}</span>}
    </p>
  </article>
);

export default ListItem;
