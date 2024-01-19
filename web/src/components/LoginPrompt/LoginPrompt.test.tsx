import { h } from 'preact';
import { fireEvent, render } from '@testing-library/preact';

import LoginPrompt from './LoginPrompt';

jest.mock('utils/auth', () => ({
  login: jest.fn(),
}));

const login = require('utils/auth').login; // eslint-disable-line -- require syntax necessary to spy on function

describe('<LoginPrompt />', () => {
  const error = 'Sorry, you are not authorized to add content.';
  const heading = 'You Must Be An Approved User to Add Books';
  const contents = 'Please log in to continue';

  it('renders with the login message and login button', () => {
    const { getByRole, queryByText } = render(<LoginPrompt />);

    const loginButton = getByRole('button');

    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent('Log In');

    expect(queryByText(error)).toEqual(null);
    expect(queryByText(heading)).toBeInTheDocument();
    expect(queryByText(contents)).toBeInTheDocument();
  });

  it('renders an overlaid error message when an error is present', () => {
    const { queryByText } = render(<LoginPrompt error />);

    expect(queryByText(error)).toBeInTheDocument();
  });

  it('attempts to log in when user clicks on the "Log In" button', () => {
    const { getByRole } = render(<LoginPrompt />);

    const loginButton = getByRole('button');

    fireEvent.click(loginButton);

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith('add');
  });
});
