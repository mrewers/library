import { h } from 'preact';
import { fireEvent, render } from '@testing-library/preact';

import Navigation from './Navigation';

jest.mock('utils/auth', () => ({
  logout: jest.fn(),
  isLoggedIn: jest.fn().mockReturnValueOnce(false).mockReturnValue(true),
}));

const logout = require('utils/auth').logout; // eslint-disable-line -- require syntax necessary to spy on logout function

describe('<Navigation />', () => {
  it('renders with the anticipated navigation links', () => {
    const { queryByRole, queryByText } = render(<Navigation />);

    const home = queryByText('Home');
    const add = queryByText('Add New');
    const retired = queryByText('Jettisoned');

    expect(home).toBeInTheDocument();
    expect(home.getAttribute('href')).toEqual('/');

    expect(add).toBeInTheDocument();
    expect(add.getAttribute('href')).toEqual('/add');

    expect(retired).toBeInTheDocument();
    expect(retired.getAttribute('href')).toEqual('/retired');

    expect(queryByRole('button')).toEqual(null);
  });

  it('includes a log out button when a user is logged in', () => {
    const { getByRole } = render(<Navigation />);

    const button = getByRole('button');

    expect(button).toBeInTheDocument();
    expect(button.textContent).toEqual('Log Out');

    fireEvent.click(button);

    expect(logout).toHaveBeenCalledTimes(1);
  });
});
