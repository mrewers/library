import { containsReader, getSelectedReaderData } from '../readers';

import { readerData, readerList } from '~/mocks/readers';

describe('containsReader()', () => {
  it('correctly identifies that provided user is in the list', () => {
    const contains = containsReader(readerList, 'Alice');

    expect(contains).toEqual(true);
  });

  it('correctly identifies that provided user is not in the list', () => {
    const contains = containsReader(readerList, 'Zeke');

    expect(contains).toEqual(false);
  });
});

describe('getSelectedReaderData()', () => {
  it('returns the expected user based on the provided name', () => {
    const selected = getSelectedReaderData(readerData, 'Bob');

    expect(selected).toEqual(readerData[1]);
  });
});
