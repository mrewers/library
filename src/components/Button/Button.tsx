import { h } from 'preact';

import './Button.scss';

const Button = ({ classes, color, label, type }: IButton): h.JSX.Element => (
  <button class={`button ${color} ${classes}`} type={type}>
    {label}
  </button>
);

Button.displayName = 'Button';

export default Button;
