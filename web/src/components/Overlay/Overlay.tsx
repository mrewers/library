import type { Component } from 'solid-js';

import s from './Overlay.module.scss';

interface IOverlayProps {
  readonly text: string;
  readonly nested?: boolean;
}

const Overlay: Component<IOverlayProps> = (props) => (
  <div class={`${s.overlay} ${props.nested ? s.nested : ''}`}>
    {props.text}
  </div>
);


export default Overlay;
