import Icon from './Icon';

import type { Component } from 'solid-js';
import type { IIconConfig } from './Icon';

/**
 * An SVG displaying an X.
 * @param props.hidden Optional - Whether or not the SVG should be hidden from screen readers. Defaults to false.
 * @param props.height Optional - The height that the icon should take up. Defaults to 24px.
 * @param props.width Optional - The width that the icon should take up. Defaults to 24px.
 * @param props.stroke Optional - The thickness of the SVG line stroke. Defaults to 2px.
 * @param props.color Optional - The color of the SVG line stroke. Defaults to 'currentColor'.
 * @param props.title Optional - A title to apply to the icon.
 * @returns A SolidJS JSX component.
 */
const XIcon: Component<IIconConfig> = (props) => (
  <Icon {...props} >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </Icon>
)

export default XIcon;
