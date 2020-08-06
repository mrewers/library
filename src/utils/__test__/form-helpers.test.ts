import { toggleArrayValues } from '../form-helpers';

describe('toggleArrayValues()', () => {
  it('removes the provided item from the provided array if it is already present', () => {
    const arr = ['Alice', 'Bob', 'Cornelius'];

    const newArray = toggleArrayValues(arr, 'Cornelius');

    expect(newArray.length).toEqual(2);
    expect(newArray.includes('Alice')).toEqual(true);
    expect(newArray.includes('Bob')).toEqual(true);
    expect(newArray.includes('Cornelius')).toEqual(false);
  });

  it('adds the provided item from an array if it is not present', () => {
    const arr = ['Alice', 'Bob'];

    const newArray = toggleArrayValues(arr, 'Cornelius');

    expect(newArray.length).toEqual(3);
    expect(newArray.includes('Alice')).toEqual(true);
    expect(newArray.includes('Bob')).toEqual(true);
    expect(newArray.includes('Cornelius')).toEqual(true);
  });
});
