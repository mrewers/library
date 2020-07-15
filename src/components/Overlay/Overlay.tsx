import { h } from 'preact';

import './Overlay.scss';

interface IOverlayProps {
  readonly text: string;
}

const Overlay = ({ text }: IOverlayProps): h.JSX.Element => <div class="overlay">{text}</div>;

Overlay.displayName = 'Overlay';

export default Overlay;
