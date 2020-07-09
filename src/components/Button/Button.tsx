import { h } from 'preact';

import './Button.scss';

const Button = ({
  classes,
  color,
  label,
  type,
}: {
  classes: string;
  color: string;
  label: string;
  type: string;
}) => (
  <button class={`button ${color} ${classes}`} type={type}>
    {label}
  </button>
);

Button.displayName = 'Button';

export default Button;
