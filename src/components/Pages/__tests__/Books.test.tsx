import { h } from 'preact';
import { render } from '@testing-library/preact';

import Books from '../Books';

import { books } from '~/mocks/books';
import { readerList } from '~/mocks/readers';

jest.mock('preact/hooks', () => {
  return {
    useContext(): IMockContext {
      return {
        state: {
          books,
          reader: 'Alice',
          readers: readerList,
          status: 'read',
        },
      };
    },
  };
});

jest.mock('components/Filter/Filter', () => (): h.JSX.Element => <div>Filter</div>);
jest.mock('components/List/List', () => (): h.JSX.Element => <div>List</div>);

describe('<Books />', () => {
  it('renders a title, filter, and list', () => {
    const { getByText } = render(<Books />);

    const title = getByText('Inventory');
    const filter = getByText('Filter');
    const list = getByText('List');

    expect(title).toBeInTheDocument();
    expect(filter).toBeInTheDocument();
    expect(list).toBeInTheDocument();
  });
});

interface IMockContext {
  readonly state: {
    readonly books: TypeBookList;
    readonly reader: string;
    readonly readers: string[];
    readonly status: string;
  };
}
