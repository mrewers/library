import { h } from 'preact';

import Button from '~components/Button/Button';

import { login } from '~/utils/auth';

import './LoginPrompt.scss';

const LoginPrompt = (): h.JSX.Element => (
  <div class="login-prompt">
    <strong class="login-content login-heading">You Must Be An Approved User to Add Books</strong>
    <p class="login-content">Please log in to continue</p>
    <Button color="plain" label="Log In" type="button" onClick={() => login()} />
  </div>
);

LoginPrompt.displayName = 'LoginPrompt';

export default LoginPrompt;
