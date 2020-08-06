import { h } from 'preact';

import Button from '~/components/Button/Button';
import Overlay from '~/components/Overlay/Overlay';

import { login } from '~/utils/auth';

import s from './LoginPrompt.scss';

interface ILoginPromptProps {
  readonly error?: boolean;
}

const LoginPrompt = ({ error }: ILoginPromptProps): h.JSX.Element => (
  <div class={s.prompt}>
    {error && <Overlay text="Sorry, you are not authorized to add content." />}
    <strong class={`${s.content} ${s.heading}`}>You Must Be An Approved User to Add Books</strong>
    <p class={s.content}>Please log in to continue</p>
    <Button color="plain" label="Log In" type="button" onClick={(): void => login('add')} />
  </div>
);

LoginPrompt.displayName = 'LoginPrompt';

export default LoginPrompt;
