import { containsReader, getSelectedReaderData } from '../readers';
import { readerData, readerList } from 'mocks/readers';

describe('containsReader()', () => {
  it('correctly identifies that provided user is in the list', () => {
    const contains = containsReader(readerList, 'Alice');

    expect(contains).toStrictEqual(true);
  });

  it('correctly identifies that provided user is not in the list', () => {
    const contains = containsReader(readerList, 'Zeke');

    expect(contains).toStrictEqual(false);
  });
});

describe('getSelectedReaderData()', () => {
  it('returns the expected user based on the provided name', () => {
    const selected = getSelectedReaderData(readerData, 'Bob');

    expect(selected).toStrictEqual(readerData[1]);
  });
});
