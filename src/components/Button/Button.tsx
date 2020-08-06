import { h } from 'preact';

import s from './Button.scss';

interface IButton {
  readonly classes?: string;
  readonly color?: 'accent' | 'dark' | 'light' | 'plain' | 'white';
  readonly label: string;
  readonly onClick?: (e?: h.JSX.TargetedEvent) => void;
  readonly type?: 'button' | 'submit';
}

const Button = ({
  classes = '',
  color = 'light',
  label,
  onClick,
  type = 'button',
}: IButton): h.JSX.Element => (
  // eslint-disable-next-line react/button-has-type -- make type configurable
  <button class={`${s.button} ${s[color]} ${classes}`} type={type} onClick={onClick}>
    {label}
  </button>
);

Button.displayName = 'Button';

export default Button;
