import type { Component } from 'solid-js';

import s from './Overlay.module.scss';

interface IOverlayProps {
  readonly text: string;
}

const Overlay: Component<IOverlayProps> = ({ text }) => (
  <div class={s.overlay}>{text}</div>
);


export default Overlay;
