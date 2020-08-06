import { h } from 'preact';
import { render } from '@testing-library/preact';

import Header from './Header';

jest.mock('~/components/Navigation/Navigation', () => (): h.JSX.Element => <nav>Navigation</nav>);

describe('<Header />', () => {
  const title = 'Test Title';

  it('renders a header element with an H1 heading and navigation as children', () => {
    const { getByRole } = render(<Header title={title} />);

    const header = getByRole('banner');
    const heading = getByRole('heading');
    const nav = getByRole('navigation');

    expect(header).toBeInTheDocument();

    expect(heading).toBeInTheDocument();
    expect(heading.nodeName).toEqual('H1');

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveTextContent('Navigation');
  });

  it('renders with the provided title linked to the homepage', () => {
    const { getByRole } = render(<Header title={title} />);

    const heading = getByRole('heading');
    const link = getByRole('link');

    expect(heading).toBeInTheDocument();
    expect(heading.firstElementChild).toEqual(link);

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href');
    expect(link.getAttribute('href')).toEqual('/');
    expect(link).toHaveTextContent(title);
  });
});
