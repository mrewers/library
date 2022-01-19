import { h } from 'preact';
import { useContext } from 'preact/hooks';

import Checkmark from 'components/Checkmark/Checkmark';

import { BookContext } from 'context/bookContext';
import { FilterContext } from 'context/filterContext';
import { ModalContext } from 'context/modalContext';
import { containsReader, getSelectedReaderData } from 'utils/readers';
import { isLoggedIn } from 'utils/auth';

import s from './ListItem.module.scss';

interface IListItemProps {
  readonly item: IBook | IRetired;
}

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
    const { id } = e.target as HTMLElement;

    if (typeof id === 'string') {
      dispatch({ type: 'OPEN_MODAL', payload: { id } });
    }
  };

  return (
    <article>
      <button
        class={s.trigger}
        disabled={!isLoggedIn()}
        id={item.id}
        type="button"
        onClick={(e): void => openModal(e)}
      >
        {isCollective &&
          readerData.map(r => (
            <Checkmark
              key={r.name}
              checked={containsReader(item.read, r.name)}
              color={r.color}
              id={item.id}
            />
          ))}
        {!isCollective && (
          <Checkmark
            checked={containsReader(item.read, reader)}
            color={getSelectedReaderData(readerData, reader).color}
            id={item.id}
          />
        )}
        <p class={s.text} id={item.id}>
          <strong id={item.id}>{item.title}</strong>
          {item.author && <span class={s.author} id={item.id}>{` - ${item.author}`}</span>}
        </p>
      </button>
    </article>
  );
};

ListItem.displayName = 'ListItem';

export default ListItem;
