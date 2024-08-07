import { getColor } from '../colors';

const expected = {
  blueDark: '000e4d',
  blueLight: '7ac0ff',
  green: '00b899',
  orange: 'f17f63',
  pink: 'ee78ac',
};

describe('getColor()', () => {
  it('returns the expected hex value when a valid color is provided', () => {
    const blue = getColor('blue');
    const green = getColor('green');
    const orange = getColor('orange');
    const pink = getColor('pink');

    expect(blue).toStrictEqual(expected.blueLight);
    expect(green).toStrictEqual(expected.green);
    expect(orange).toStrictEqual(expected.orange);
    expect(pink).toStrictEqual(expected.pink);
  });

  it('defaults to the dark blue hex value when an invalid color is provided', () => {
    const empty = getColor('');
    const invalid = getColor('invalid');

    expect(empty).toStrictEqual(expected.blueDark);
    expect(invalid).toStrictEqual(expected.blueDark);
  });
});
