import { h } from 'preact';
import s from './Overlay.module.scss';

interface IOverlayProps {
  readonly text: string;
}

const Overlay = ({ text }: IOverlayProps): h.JSX.Element => <div className={s.overlay}>{text}</div>;

Overlay.displayName = 'Overlay';

export default Overlay;
