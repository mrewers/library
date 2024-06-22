import Icon from './Icon';

import type { Component } from 'solid-js';
import type { IIconConfig } from './Icon';

/**
 * An SVG displaying an X within a circle.
 * @param props.hidden Optional - Whether or not the SVG should be hidden from screen readers. Defaults to false.
 * @param props.height Optional - The height that the icon should take up. Defaults to 24px.
 * @param props.width Optional - The width that the icon should take up. Defaults to 24px.
 * @param props.stroke Optional - The thickness of the SVG line stroke. Defaults to 2px.
 * @param props.color Optional - The color of the SVG line stroke. Defaults to 'currentColor'.
 * @param props.title Optional - A title to apply to the icon.
 * @returns A SolidJS JSX component.
 */
const XCircleIcon: Component<IIconConfig> = (props) => (
  <Icon {...props} >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </Icon>
)

export default XCircleIcon;
