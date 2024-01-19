import { Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import Header from 'components/Header/Header';
import StatsWidget from 'components/StatsWidget/StatsWidget';
import s from 'style/style.module.scss';

interface ILayoutProps {
  readonly stats?: boolean
  readonly children: JSX.Element
}

const Layout: Component<ILayoutProps> = (props) => (
  <>
    <Header title="Library" />
    <div class={s['page-container']}>
      <Show when={props.stats !== false}>
        <StatsWidget />
      </Show>
      <main style={props.stats === false ? {transform: 'translateY(0)'} : ''}>
        {props.children}
      </main>
    </div>
  </>
)

export default Layout;
