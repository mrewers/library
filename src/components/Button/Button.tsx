import { h } from 'preact';

import './Button.scss';

const Button = ({ classes, color, label, type = 'button' }: IButton): h.JSX.Element => (
  // eslint-disable-next-line react/button-has-type -- make type configurable
  <button class={`button ${color} ${classes}`} type={type}>
    {label}
  </button>
);

Button.displayName = 'Button';

export default Button;
