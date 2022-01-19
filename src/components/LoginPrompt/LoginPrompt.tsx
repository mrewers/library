import { h } from 'preact';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import { login } from 'utils/auth';
import s from './LoginPrompt.module.scss';

interface ILoginPromptProps {
  readonly error?: boolean;
}

const LoginPrompt = ({ error }: ILoginPromptProps): h.JSX.Element => (
  <div className={s.prompt}>
    {error && <Overlay text="Sorry, you are not authorized to add content." />}
    <strong className={`${s.content} ${s.heading}`}>
      You Must Be An Approved User to Add Books
    </strong>
    <p className={s.content}>Please log in to continue</p>
    <Button color="plain" label="Log In" type="button" onClick={(): void => login('add')} />
  </div>
);

LoginPrompt.displayName = 'LoginPrompt';

export default LoginPrompt;
