import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { BookContext } from '../../context/bookContext';
import { FilterContext } from '../../context/filterContext';
import { filterList } from '../../utils/list-filters';

import './Filter.scss';

const Filter = (): h.JSX.Element => {
  const { state: bookState } = useContext(BookContext);
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

  const matches = filterList(status, reader, bookState.readers.length, bookState.books).length;

  return (
    <p>
      Show
      <label class="dropdown" for="filter-type">
        <select
          id="filter-type"
          name="type"
          value={status}
          onBlur={handleChange}
          onChange={handleChange}
        >
          <option value="all">All</option>
          <option value="read">Read</option>
          <option value="unread">Unread</option>
        </select>
      </label>
      books for
      <label class="dropdown" for="filter-reader">
        <select
          id="filter-reader"
          name="reader"
          value={reader}
          onBlur={handleChange}
          onChange={handleChange}
        >
          <option value="any">Any Reader</option>
          <option value="all">All Readers</option>
          {bookState.readers.map(reader => (
            <option key={reader} value={reader}>
              {reader}
            </option>
          ))}
        </select>
      </label>
      <strong>{` - ${matches || 0} matches`}</strong>
    </p>
  );
};

Filter.displayName = 'Filter';

export default Filter;
