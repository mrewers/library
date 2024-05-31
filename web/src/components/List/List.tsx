import { For, Show } from 'solid-js';

import ListItem from 'components/ListItem/ListItem';

import s from './List.module.scss';

import type { Component, JSX } from 'solid-js';

interface IListProps {
  readonly list: IBook[];
  readonly loading: boolean;
  readonly read: IBook[];
}

const List: Component<IListProps> = (props) => (
  <section>
    <Show when={props.loading}>
      <div class={s.loader}>Loading...</div>
    </Show>
    <Show when={!props.loading && props.list.length === 0}>
      <div class={s.loader}>No Books to Display</div>
    </Show>
    <Show when={props.list.length > 0}>
      <ul class={s.list}>
        <For each={props.list}>{
          (item): JSX.Element => (
            <li class={props.read.includes(item) ? s.read : ''}>
              <ListItem item={item} />
            </li>
          )
        }</For>
      </ul>
    </Show>
  </section>
);

export default List;
