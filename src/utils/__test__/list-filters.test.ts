import { filterList, getListStats, getRead } from '../list-filters';
import { books } from '~/mocks/books';

describe('filterList()', () => {
  it('returns the books read by the specified reader when the status is "read"', () => {
    const read = filterList('read', 'Alice', 2, books);

    expect(read.length).toEqual(2);
    expect(read[0].id).toEqual('abcd');
    expect(read[1].id).toEqual('efgh');
  });

  it('returns the books not read by the specified reader when the status is "unread"', () => {
    const unreadAlice = filterList('unread', 'Alice', 2, books);

    expect(unreadAlice.length).toEqual(1);
    expect(unreadAlice[0].id).toEqual('ijkl');

    const unreadAll = filterList('unread', 'all', 2, books);

    expect(unreadAll.length).toEqual(1);
    expect(unreadAll[0].id).toEqual('ijkl');

    const unreadAny = filterList('unread', 'any', 2, books);

    expect(unreadAny.length).toEqual(2);
    expect(unreadAny[0].id).toEqual('abcd');
    expect(unreadAny[1].id).toEqual('ijkl');
  });

  it('returns the full book list when an invalid status is provided', () => {
    const invalid = filterList('invalid', 'Alice', 2, books);

    expect(invalid.length).toEqual(3);
    expect(invalid[0].id).toEqual('abcd');
    expect(invalid[1].id).toEqual('efgh');
    expect(invalid[2].id).toEqual('ijkl');
  });
});

describe('getRead()', () => {
  it('returns the books read by the specified reader', () => {
    const aliceRead = getRead(books, 'Alice', 2);

    expect(aliceRead.length).toEqual(2);
    expect(aliceRead[0].id).toEqual('abcd');
    expect(aliceRead[1].id).toEqual('efgh');

    const bobRead = getRead(books, 'Bob', 2);

    expect(bobRead.length).toEqual(1);
    expect(bobRead[0].id).toEqual('efgh');

    const corneliusRead = getRead(books, 'Cornelius', 2);

    expect(corneliusRead.length).toEqual(0);
  });

  it('returns books that have been read by the number of total readers when value "all" is provided', () => {
    const allRead = getRead(books, 'all', 2);

    expect(allRead.length).toEqual(1);
    expect(allRead[0].id).toEqual('efgh');
  });

  it('returns books that have been read by one or more readers when value "any" is provided', () => {
    const anyRead = getRead(books, 'any', 2);

    expect(anyRead.length).toEqual(2);
    expect(anyRead[0].id).toEqual('abcd');
    expect(anyRead[1].id).toEqual('efgh');
  });
});

describe('getListStats()', () => {
  it('returns stats for all books, read books, and unread books depending on provided reader', () => {
    const aliceStats = getListStats(books, 'Alice', 2);

    expect(aliceStats.all).toEqual(3);
    expect(aliceStats.read).toEqual(2);
    expect(aliceStats.unread).toEqual(1);

    const noBooks = getListStats([], 'Alice', 2);

    expect(noBooks.all).toEqual(0);
    expect(noBooks.read).toEqual(0);
    expect(noBooks.unread).toEqual(0);
  });
});
