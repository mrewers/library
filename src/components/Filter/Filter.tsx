import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { BookContext } from 'context/bookContext';
import { FilterContext } from 'context/filterContext';
import { filterList } from 'utils/list-filters';
import s from './Filter.module.scss';

const Filter = (): h.JSX.Element => {
  const {
    state: { books, readers },
  } = useContext(BookContext);

  const {
    state: { reader, status },
    dispatch,
  } = useContext(FilterContext);

  const handleChange = ({ currentTarget }: TypeEventSelect): void => {
    const { name, value } = currentTarget;

    if (name === 'type' && typeof value === 'string') {
      dispatch({ type: 'UPDATE_TYPE', payload: { status: value } });
    }

    if (name === 'reader' && typeof value === 'string') {
      dispatch({ type: 'UPDATE_READER', payload: { reader: value } });
    }
  };

  const matches = filterList(status, reader, readers.length, books).length;

  return (
    <p className={s.container}>
      <span>
        Show
        <label className={s.dropdown} htmlFor="filter-type">
          <select
            id="filter-type"
            name="type"
            value={status}
            onBlur={handleChange}
            onChange={handleChange}
          >
            <option value="all">All Books</option>
            <option value="read">Read Books</option>
            <option value="unread">Unread Books</option>
          </select>
        </label>
      </span>
      <span>
        For
        <label className={s.dropdown} htmlFor="filter-reader">
          <select
            id="filter-reader"
            name="reader"
            value={reader}
            onBlur={handleChange}
            onChange={handleChange}
          >
            <option value="any">Any Reader</option>
            <option value="all">All Readers</option>
            {readers.map(r => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>
      </span>
      <span>
        <strong>{`${matches || 0} matches`}</strong>
      </span>
    </p>
  );
};

Filter.displayName = 'Filter';

export default Filter;
