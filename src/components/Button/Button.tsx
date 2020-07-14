import { h } from 'preact';

import './Button.scss';

const Button = ({ classes, color, label, onClick, type = 'button' }: IButton): h.JSX.Element => (
  // eslint-disable-next-line react/button-has-type -- make type configurable
  <button class={`button ${color} ${classes}`} type={type} onClick={onClick}>
    {label}
  </button>
);

Button.displayName = 'Button';

export default Button;
