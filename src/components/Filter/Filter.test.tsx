import { h } from 'preact';
import { fireEvent, render } from '@testing-library/preact';

import Filter from './Filter';

import { books } from '~/mocks/books';
import { readerList } from '~/mocks/readers';

jest.mock('preact/hooks', () => ({
  useContext: (): IMockContext => ({
    dispatch: jest.fn(),
    state: {
      books,
      reader: 'Alice',
      readers: readerList,
      status: 'all',
    },
  }),
}));

describe('<Filter />', () => {
  const getChildAt = (el: HTMLElement, index: number): ChildNode => el.childNodes.item(index);

  it('renders two selects with the all expected options', () => {
    const { getAllByRole } = render(<Filter />);

    const selects = getAllByRole('combobox');

    expect(selects.length).toEqual(2);

    const statusSelect = selects[0];

    expect(statusSelect.childElementCount).toEqual(3);
    expect(statusSelect).toHaveValue('all');
    expect(getChildAt(statusSelect, 0)).toHaveTextContent('All Books');
    expect(getChildAt(statusSelect, 0)).toHaveValue('all');
    expect(getChildAt(statusSelect, 1)).toHaveTextContent('Read Books');
    expect(getChildAt(statusSelect, 1)).toHaveValue('read');
    expect(getChildAt(statusSelect, 2)).toHaveTextContent('Unread Books');
    expect(getChildAt(statusSelect, 2)).toHaveValue('unread');

    const readerSelect = selects[1];

    expect(readerSelect.childElementCount).toEqual(readerList.length + 2);
    expect(readerSelect).toHaveValue('Alice');
    expect(getChildAt(readerSelect, 0)).toHaveTextContent('Any Reader');
    expect(getChildAt(readerSelect, 0)).toHaveValue('any');
    expect(getChildAt(readerSelect, 1)).toHaveTextContent('All Readers');
    expect(getChildAt(readerSelect, 1)).toHaveValue('all');
    readerList.forEach((r, i) => {
      expect(getChildAt(readerSelect, i + 2)).toHaveTextContent(r);
      expect(getChildAt(readerSelect, i + 2)).toHaveValue(r);
    });
  });

  it('renders the number of matches for the given criteria', () => {
    const expected = `${books.length} matches`;

    const { queryByText } = render(<Filter />);

    expect(queryByText(expected)).toBeInTheDocument();
  });

  it('updates the select value on change', () => {
    const { getAllByRole, getByDisplayValue } = render(<Filter />);

    const selects = getAllByRole('combobox');

    const statusSelect = selects[0];
    const readerSelect = selects[1];

    expect(statusSelect).toHaveValue('all');
    expect(readerSelect).toHaveValue('Alice');

    fireEvent.change(getByDisplayValue('All Books'), { target: { name: 'type', value: 'read' } });
    fireEvent.change(getByDisplayValue('Alice'), { target: { name: 'reader', value: 'all' } });

    expect(statusSelect).toHaveValue('read');
    expect(readerSelect).toHaveValue('all');
  });
});

interface IMockContext {
  readonly dispatch: jest.Mock;
  readonly state: {
    readonly books: TypeBookList;
    readonly reader: string;
    readonly readers: string[];
    readonly status: string;
  };
}
