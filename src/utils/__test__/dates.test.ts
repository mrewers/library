import { getDateString } from '../dates';

describe('getDateString()', () => {
  it('returns a date string in the YYYY-MM-DD format', () => {
    const date = getDateString();
    const parts = date.split('-');

    expect(date.length).toEqual(10);

    expect(parts.length).toEqual(3);
    expect(parts[0].length).toEqual(4);
    expect(parts[1].length).toEqual(2);
    expect(parts[2].length).toEqual(2);
  });
});
