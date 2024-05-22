import { Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import { getColor } from 'utils/colors';
import s from './Checkmark.module.scss';

interface ICheckmarkProps {
  readonly checked?: boolean;
  readonly color?: string;
  readonly id?: string;
}

const Checkmark: Component<ICheckmarkProps> = (props) => (
  <Show
    when={props.checked}
    fallback={
      <div class={s.checkmark} id={props.id}>
        <svg
          class={`${s.feather} ${s['feather-square']}`}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect fill="white" height="18" rx="2" ry="2" width="18" x="3" y="3" />
        </svg>
      </div> as JSX.Element
    }
  >
    <div class={s.checkmark} id={props.id}>
      <svg
        class={`${s.feather} ${s['feather-check-square']}`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" fill="white" />
        <polyline points="9 11 12 14 22 4" stroke={getColor(props.color ?? '')} stroke-width="3" />
      </svg>
    </div>
  </Show>
);

export default Checkmark;
