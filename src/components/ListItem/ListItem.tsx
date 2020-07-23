import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { BookContext } from '~/context/bookContext';
import { FilterContext } from '~/context/filterContext';
import { ModalContext } from '~/context/modalContext';
import { isLoggedIn } from '~/utils/auth';

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

  const { dispatch } = useContext(ModalContext);

  const isCollective = reader === 'all' || reader === 'any';

  const openModal = (e: h.JSX.TargetedEvent): void => {
    const { id } = e.target;

    if (typeof id === 'string') {
      dispatch({ type: 'OPEN_MODAL', payload: { id } });
    }
  };

  return (
    <article class="list-item">
      <button
        class="list-item-trigger"
        disabled={!isLoggedIn()}
        id={item.id}
        type="button"
        onClick={(e): void => openModal(e)}
      >
        {isCollective &&
          readerData.map(r => (
            <i
              key={r.name}
              class={containsReader(item.read, r.name) ? getCheckMark(r) : 'unchecked'}
              id={item.id}
            />
          ))}
        {!isCollective && (
          <i
            class={
              containsReader(item.read, reader)
                ? getCheckMark(getSelectedReaderData(readerData, reader))
                : 'unchecked'
            }
            id={item.id}
          />
        )}
        <p class="list-item-text" id={item.id}>
          <strong id={item.id}>{item.title}</strong>
          {item.author && <span class="list-item-author" id={item.id}>{` - ${item.author}`}</span>}
        </p>
      </button>
    </article>
  );
};

ListItem.displayName = 'ListItem';

export default ListItem;
