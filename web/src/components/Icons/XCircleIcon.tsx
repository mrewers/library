import type { Component } from 'solid-js';

interface IXCircleIconProps {
  readonly height?: string;
  readonly width?: string;
  readonly stroke?: string;
  readonly color?: string;
}

const XCircleIcon: Component<IXCircleIconProps> = (props) => (
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
    class="feather feather-x-circle"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

export default XCircleIcon;