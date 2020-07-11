import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { BookContext } from '../../context/bookContext';
import { FilterContext } from '../../context/filterContext';

import './Filter.scss';

const Filter = (): h.JSX.Element => {
  const { state, dispatch } = useContext(FilterContext);
  const { state: bookState } = useContext(BookContext);

  const handleChange = ({ currentTarget }: TypeEventSelect): void => {
    const { name, value } = currentTarget;

    if (name === 'type' && typeof value === 'string') {
      dispatch({ type: 'type', payload: { type: value } });
    }

    if (name === 'reader' && typeof value === 'string') {
      dispatch({ type: 'reader', payload: { reader: value } });
    }
  };

  return (
    <p>
      Show
      <label class="dropdown" for="filter-type">
        <select
          id="filter-type"
          name="type"
          value={state.type}
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
          value={state.reader}
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
    </p>
  );
};

Filter.displayName = 'Filter';

export default Filter;
