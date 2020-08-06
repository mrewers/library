import { h } from 'preact';
import { render } from '@testing-library/preact';

import FourOhFour from '../FourOhFour';

describe('<FourOhFour />', () => {
  it('renders with "page not found" message', () => {
    const { getByText } = render(<FourOhFour />);

    expect(getByText('404: Page Not Found')).toBeInTheDocument();
  });
});
