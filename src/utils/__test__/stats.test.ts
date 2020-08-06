import { calcPercentOf, getReaders } from '../stats';

describe('calcPercentOf()', () => {
  it('calculates the percentage from two provided numbers', () => {
    const percent = calcPercentOf(3, 4);

    expect(percent).toEqual(75);
  });

  it('returns zero if total is set to zero', () => {
    const percent = calcPercentOf(3, 0);

    expect(percent).toEqual(0);
  });
});

describe('getReaders()', () => {
  it('returns an empty string if no readers provided', () => {
    const noReaders = getReaders();
    const emptyArray = getReaders([]);

    expect(noReaders).toEqual('');
    expect(emptyArray).toEqual('');
  });

  it('lists readers with appropriate delimiters when less than three readers provided', () => {
    const readers1 = ['Alice'];
    const readers2 = [...readers1, 'Bob'];
    const readers3 = [...readers2, 'Cornelius'];

    const oneReader = getReaders(readers1);
    const twoReaders = getReaders(readers2);
    const twoReadersOr = getReaders(readers2, 'or');
    const twoReadersAnd = getReaders(readers2, 'and');
    const threeReaders = getReaders(readers3);
    const threeReadersOr = getReaders(readers3, 'or');
    const threeReadersAnd = getReaders(readers3, 'and');

    expect(oneReader).toEqual(' Alice');
    expect(twoReaders).toEqual(' Alice or Bob');
    expect(twoReadersOr).toEqual(' Alice or Bob');
    expect(twoReadersAnd).toEqual(' Alice & Bob');
    expect(threeReaders).toEqual(' Alice, Bob, or Cornelius');
    expect(threeReadersOr).toEqual(' Alice, Bob, or Cornelius');
    expect(threeReadersAnd).toEqual(' Alice, Bob, & Cornelius');
  });

  it('returns "any reader" when more than three readers provided with or operator', () => {
    const readers = ['Alice', 'Bob', 'Cornelius', 'Diane'];

    const noOperator = getReaders(readers);
    const orOperator = getReaders(readers, 'or');

    expect(noOperator).toEqual(' any reader');
    expect(orOperator).toEqual(' any reader');
  });

  it('returns "all readers" when more than three readers provided with and operator', () => {
    const readers = ['Alice', 'Bob', 'Cornelius', 'Diane'];

    const andOperator = getReaders(readers, 'and');

    expect(andOperator).toEqual(' all readers');
  });
});
