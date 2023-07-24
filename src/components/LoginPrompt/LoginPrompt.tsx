import type { Component } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import { login } from 'utils/auth';
import s from './LoginPrompt.module.scss';

interface ILoginPromptProps {
  readonly error: boolean;
  readonly callback: string;
  readonly message: string;
}

const LoginPrompt: Component<ILoginPromptProps> = (props) => (
  <div class={s.prompt}>
    {props.error && <Overlay text="Sorry, you are not authorized to add content." />}
    <strong class={`${s.content} ${s.heading}`}>
      {`You Must Be An Approved User to ${props.message}`}
    </strong>
    <p class={s.content}>Please log in to continue</p>
    <Button
      color="plain"
      label="Log In"
      type="button"
      onClick={(): void => login(props.callback)}
    />
  </div>
);

export default LoginPrompt;
