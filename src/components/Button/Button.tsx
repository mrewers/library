import type { Component } from 'solid-js';

import s from './Button.module.scss';

interface IButton {
  readonly classes?: string;
  readonly color?: 'accent' | 'dark' | 'light' | 'plain' | 'white';
  readonly label: string;
  readonly onClick?: (e: MouseEvent) => void;
  readonly type?: 'button' | 'submit';
}

const Button: Component<IButton> = (props) => {
  const onClickFallback = () => {};

  const onClickFunc = typeof props.onClick !== 'undefined'
    ? props.onClick
    : onClickFallback;

  return (
  <button
    class={`${s.button}
    ${s[props.color ?? 'light']}
    ${props.classes ?? ''}`}
    type={props.type ?? 'button'}
    onClick={(e) => onClickFunc(e)} 
  >
    {props.label}
  </button>
)};

export default Button;
