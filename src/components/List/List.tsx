import { For } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import ListItem from 'components/ListItem/ListItem';

import s from './List.module.scss';

interface IListProps {
  readonly list: IBook[];
  readonly read: IBook[];
}

const List: Component<IListProps> = (props) => (
  <section>
    {props.list.length === 0 && <div class={s.loader}>Loading...</div>}
    {props.list.length > 0 && (
      <ul class={s.list}>
        <For each={props.list}>{
          (item): JSX.Element => (
            <li class={props.read.includes(item) ? s.read : ''}>
              <ListItem item={item} />
            </li>
          )
        }</For>
      </ul>
    )}
  </section>
);

export default List;
