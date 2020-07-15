import { h } from 'preact';

import Button from '~components/Button/Button';
import Overlay from '~components/Overlay/Overlay';

import { login } from '~/utils/auth';

import './LoginPrompt.scss';

interface ILoginPromptProps {
  readonly error?: boolean;
}

const LoginPrompt = ({ error }: ILoginPromptProps): h.JSX.Element => (
  <div class="login-prompt">
    {error && <Overlay text="Sorry, you are not authorized to add content." />}
    <strong class="login-content login-heading">You Must Be An Approved User to Add Books</strong>
    <p class="login-content">Please log in to continue</p>
    <Button color="plain" label="Log In" type="button" onClick={(): void => login()} />
  </div>
);

LoginPrompt.displayName = 'LoginPrompt';

export default LoginPrompt;
