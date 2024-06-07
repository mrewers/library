import { getListStats, getRead } from '../list-filters';
import { books } from 'mocks/books';

describe('getRead()', () => {
  it('returns the books read by the specified reader', () => {
    const aliceRead = getRead(books, 'Alice', 2);

    expect(aliceRead).toHaveLength(2);
    expect(aliceRead[0].id).toStrictEqual('abcd');
    expect(aliceRead[1].id).toStrictEqual('efgh');

    const bobRead = getRead(books, 'Bob', 2);

    expect(bobRead).toHaveLength(1);
    expect(bobRead[0].id).toStrictEqual('efgh');

    const corneliusRead = getRead(books, 'Cornelius', 2);

    expect(corneliusRead).toHaveLength(0);
  });

  it('returns books that have been read by the number of total readers when value "all" is provided', () => {
    const allRead = getRead(books, 'all', 2);

    expect(allRead).toHaveLength(1);
    expect(allRead[0].id).toStrictEqual('efgh');
  });

  it('returns books that have been read by one or more readers when value "any" is provided', () => {
    const anyRead = getRead(books, 'any', 2);

    expect(anyRead).toHaveLength(2);
    expect(anyRead[0].id).toStrictEqual('abcd');
    expect(anyRead[1].id).toStrictEqual('efgh');
  });
});

describe('getListStats()', () => {
  it('returns stats for all books, read books, and unread books depending on provided reader', () => {
    const aliceStats = getListStats(books, 'Alice', 2);

    expect(aliceStats.all).toStrictEqual(3);
    expect(aliceStats.read).toStrictEqual(2);
    expect(aliceStats.unread).toStrictEqual(1);

    const noBooks = getListStats([], 'Alice', 2);

    expect(noBooks.all).toStrictEqual(0);
    expect(noBooks.read).toStrictEqual(0);
    expect(noBooks.unread).toStrictEqual(0);
  });
});
