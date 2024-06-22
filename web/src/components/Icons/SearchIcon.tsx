import Icon from './Icon';

import type { Component } from 'solid-js';
import type { IIconConfig } from './Icon';

/**
 * An SVG displaying a magnifying glass.
 * @param props.hidden Optional - Whether or not the SVG should be hidden from screen readers. Defaults to false.
 * @param props.height Optional - The height that the icon should take up. Defaults to 24px.
 * @param props.width Optional - The width that the icon should take up. Defaults to 24px.
 * @param props.stroke Optional - The thickness of the SVG line stroke. Defaults to 2px.
 * @param props.color Optional - The color of the SVG line stroke. Defaults to 'currentColor'.
 * @param props.title Optional - A title to apply to the icon.
 * @returns A SolidJS JSX component.
 */
const SearchIcon: Component<IIconConfig> = (props) => (
  <Icon {...props} >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </Icon>
)

export default SearchIcon;
