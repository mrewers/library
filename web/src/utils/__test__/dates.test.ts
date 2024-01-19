import { getDateString } from '../dates';

describe('getDateString()', () => {
  it('returns a date string in the YYYY-MM-DD format', () => {
    const date = getDateString();
    const parts = date.split('-');

    expect(date).toHaveLength(10);

    expect(parts).toHaveLength(3);
    expect(parts[0]).toHaveLength(4);
    expect(parts[1]).toHaveLength(2);
    expect(parts[2]).toHaveLength(2);
  });
});
