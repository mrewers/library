import { For, Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';
import { A } from '@solidjs/router';

import Checkmark from 'components/Checkmark/Checkmark';

import { containsReader, getSelectedReaderData } from 'utils/readers';
import { useFilters } from 'context/FilterProvider';
import { useReaders } from 'context/ReaderProvider';

import s from './ListItem.module.scss';

interface IListItemProps {
  readonly item: IBook | IRetired;
}

const ListItem: Component<IListItemProps> = (props) => {
  const [filters] = useFilters();
  const [readerList] = useReaders();

  const isCollective = () => filters.reader() === 'all' || filters.reader() === 'any';

  return (
    <article>
      <A
        class={s.trigger}
        href={`/book/${props.item.id}`}
      >
        <Show
          when={isCollective()}
          fallback={
            <Checkmark
              checked={containsReader(props.item.readBy, filters.reader())}
              color={getSelectedReaderData(readerList, filters.reader()).color}
              id={props.item.id}
            />
          }
        >
          <For each={readerList}>{
            (r): JSX.Element => (
              <Checkmark
                checked={containsReader(props.item.readBy, r.id)}
                color={r.color}
                id={props.item.id}
              />
            )
          }</For>
        </Show>
        <p class={s.text} id={props.item.id}>
          <strong id={props.item.id}>{props.item.title}</strong>
          { props.item.author && (
            <span class={s.author} id={props.item.id}>{` - ${props.item.author}`}</span>
          ) }
        </p>
      </A>
    </article>
  )
};

export default ListItem;
