import { h } from 'preact';
import { fireEvent, render } from '@testing-library/preact';

import Button from './Button';

const label = 'Test Button';
const spy = jest.fn();

describe('<Button />', () => {
  it('renders when optional props omitted', () => {
    const { getByText } = render(<Button label={label} />);

    expect(getByText(label)).toBeInTheDocument();
  });

  it('renders when optional props provided', () => {
    const { getByText } = render(
      <Button classes="test-class" color="accent" label={label} type="submit" onClick={spy} />
    );

    expect(getByText(label)).toBeInTheDocument();
  });

  it('fires the onClick function when clicked', () => {
    const { getByRole } = render(<Button label={label} onClick={spy} />);

    const button = getByRole('button');

    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
