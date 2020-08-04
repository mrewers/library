import { h } from 'preact';

import s from './Overlay.scss';

interface IOverlayProps {
  readonly text: string;
}

const Overlay = ({ text }: IOverlayProps): h.JSX.Element => <div class={s.overlay}>{text}</div>;

Overlay.displayName = 'Overlay';

export default Overlay;
