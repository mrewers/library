import { h } from 'preact';
import { render } from '@testing-library/preact';

import List from './List';

import { books, bookOne } from '~/mocks/books';

jest.mock('components/ListItem/ListItem', () => (): string => 'list-item');

const emptyList: TypeBookList = [];

describe('<List />', () => {
  it('returns a list item for each book in the list', () => {
    const { queryByText, queryAllByText } = render(<List list={books} read={[bookOne]} />);

    const listItems = queryAllByText('list-item');

    expect(listItems.length).toEqual(books.length);
    expect(queryByText('Loading...')).toEqual(null);
  });

  it('render the loader if book list is empty', () => {
    const { getByText } = render(<List list={emptyList} read={emptyList} />);

    expect(getByText('Loading...')).toBeInTheDocument();
  });
});
