import { h } from 'preact';

import s from './Mask.scss';

const Mask = (): h.JSX.Element => (
  <div class={s.container}>
    <div class={s.background}>
      <span class={s.credit}>
        Background photo courtesy of Robert Anasch on Unsplash, and used under the Unsplash License
        https://unsplash.com/license
      </span>
    </div>
    <svg
      class={`${s.mask}`}
      preserveAspectRatio="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M64 0 L0 0 L0 50 C4 38 12 40 64 26 Z" />
    </svg>
    <svg
      class={`${s.mask} ${s.bottom}`}
      preserveAspectRatio="none"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 64 L64 64 L64 40 C60 52 52 40 0 64 Z" />
    </svg>
  </div>
);

// SVG generated with http://jxnblk.com/paths

Mask.displayName = 'Mask';

export default Mask;
