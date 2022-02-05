import { toggleArrayValues } from '../form-helpers';

describe('toggleArrayValues()', () => {
  it('removes the provided item from the provided array if it is already present', () => {
    const arr = ['Alice', 'Bob', 'Cornelius'];

    const newArray = toggleArrayValues(arr, 'Cornelius');

    expect(newArray).toHaveLength(2);
    expect(newArray).toContain('Alice');
    expect(newArray).toContain('Bob');
    expect(newArray).not.toContain('Cornelius');
  });

  it('adds the provided item from an array if it is not present', () => {
    const arr = ['Alice', 'Bob'];

    const newArray = toggleArrayValues(arr, 'Cornelius');

    expect(newArray).toHaveLength(3);
    expect(newArray).toContain('Alice');
    expect(newArray).toContain('Bob');
    expect(newArray).toContain('Cornelius');
  });
});
