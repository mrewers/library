import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { FilterContext } from '~/context/filterContext';
import { BookContext } from '~/context/bookContext';

import './ListItem.scss';

interface IListItemProps {
  readonly item: IBook;
}

const containsReader = (readers: readonly string[], name: string): boolean =>
  readers.includes(name);

const getSelectedReaderData = (readers: readonly IReader[], name: string): IReader => {
  const reader = readers.filter(reader => reader.name === name);

  return reader[0];
};

const getCheckMark = (reader: IReader): string => {
  return reader.color ? `checked-${reader.color}` : 'checked-generic';
};

const ListItem = ({ item }: IListItemProps): h.JSX.Element => {
  const {
    state: { reader },
  } = useContext(FilterContext);
  const {
    state: { readerData },
  } = useContext(BookContext);

  const isCollective = reader === 'all' || reader === 'any';

  return (
    <article class="list-item">
      {isCollective &&
        readerData.map(r => (
          <i
            key={r.name}
            class={containsReader(item.read, r.name) ? getCheckMark(r) : 'unchecked'}
          />
        ))}
      {!isCollective && (
        <i
          class={
            containsReader(item.read, reader)
              ? getCheckMark(getSelectedReaderData(readerData, reader))
              : 'unchecked'
          }
        />
      )}
      <p class="list-item-text">
        <strong>{item.title}</strong>
        {item.author && <span class="list-item-author">{` - ${item.author}`}</span>}
      </p>
    </article>
  );
};

ListItem.displayName = 'ListItem';

export default ListItem;
