import { h } from 'preact';
import { render } from '@testing-library/preact';

import Overlay from './Overlay';

const text = 'Mock Overlay Text';

describe('<Overlay />', () => {
  it('renders with the provided text', () => {
    const { getByText } = render(<Overlay text={text} />);

    expect(getByText(text)).toBeInTheDocument();
  });
});
