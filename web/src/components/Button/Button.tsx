import type { Component } from 'solid-js';

import s from './Button.module.scss';

interface IButton {
  readonly classes?: string;
  readonly color?: 'accent' | 'dark' | 'light' | 'link' | 'plain' | 'white';
  readonly data?: { name: string, value: string }[];
  readonly disabled?: boolean,
  readonly label: string;
  readonly onClick?: (e: MouseEvent) => void;
  readonly type?: 'button' | 'submit';
}

const Button: Component<IButton> = (props) => {
  const onClickFallback = () => {};

  const onClickFunc = typeof props.onClick !== 'undefined'
    ? props.onClick
    : onClickFallback;

  /**
   * Iterates through and array of name-value pairs that
   * should be converted into dataset properties.
   * @returns An object containing the resulting dataset.
   */
  const dataIds = () => {
    const dataProps = {} as {[key: string]: string};

    if (props.data) {
      props.data.forEach( i => {
        dataProps[`data-${i.name}`] = i.value;
      } );
    };

    return dataProps;
  };

  return (
    <button
      class={
        `${s.button}
        ${s[props.color ?? 'light']}
        ${props.classes ?? ''}`
      }
      disabled={props.disabled || false}
      type={props.type ?? 'button'}
      onClick={(e) => onClickFunc(e)}
      {...dataIds()}
    >
      {props.label}
    </button>
  )
};

export default Button;
