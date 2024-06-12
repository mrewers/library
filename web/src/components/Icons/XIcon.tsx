import { Show } from 'solid-js';

import type { Component } from 'solid-js';

interface IXIconProps {
  readonly height?: string
  readonly width?: string
  readonly stroke?: string
  readonly color?: string
  readonly title?: string
}

/**
 * An SVG displaying an X.
 * @param props.height Optional - The height that the icon should take up. Defaults to 24px.
 * @param props.width Optional - The width that the icon should take up. Defaults to 24px.
 * @param props.stroke Optional - The thickness of the SVG line stroke. Defaults to 2px.
 * @param props.color Optional - The color of the SVG line stroke. Defaults to 'currentColor'.
 * @param props.title Optional - A title to apply to the icon.
 * @returns A SolidJS JSX component.
 */
const XIcon: Component<IXIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.height || "24"}
    width={props.width || "24"}
    viewBox="0 0 24 24"
    fill="none"
    stroke={props.color || "currentColor"}
    stroke-width={props.stroke || "2"}
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-x"
  >
    <Show when={props.title}>
      <title>{props.title}</title>
    </Show>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default XIcon;
