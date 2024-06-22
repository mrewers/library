import { Show } from 'solid-js';

import type { Component, JSX } from 'solid-js';

export interface IIconConfig {
  /** Whether or not the svg should be hidden from screen readers. */
  readonly hidden?: boolean
  /** The height that the icon should take up. */
  readonly height?: string
  /** The width that the icon should take up. */
  readonly width?: string
  /** The thickness of the SVG line stroke. */
  readonly stroke?: string
  /** The color of the SVG line stroke. */
  readonly color?: string
  /** A title to apply to the icon. */
  readonly title?: string
}

interface IIconProps extends IIconConfig {
  readonly children?: JSX.Element
}

/**
 * An wrapper that applies the SVG tag with all relevant properties for an icon.
 * @param props.hidden Optional - Whether or not the svg should be hidden from screen readers. Defaults to false.
 * @param props.height Optional - The height that the icon should take up. Defaults to 24px.
 * @param props.width Optional - The width that the icon should take up. Defaults to 24px.
 * @param props.stroke Optional - The thickness of the SVG line stroke. Defaults to 2px.
 * @param props.color Optional - The color of the SVG line stroke. Defaults to 'currentColor'.
 * @param props.title Optional - A title to apply to the icon.
 * @returns A SolidJS JSX component.
 */
const Icon: Component<IIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden={props.hidden || false}
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
    {props.children}
  </svg>
);

export default Icon;
