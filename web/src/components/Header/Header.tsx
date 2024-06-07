import type { Component } from 'solid-js';
import { A } from '@solidjs/router';

import Navigation from 'components/Navigation/Navigation';
import NavigationMobile from 'components/NavigationMobile/NavigationMobile';

import s from './Header.module.scss';

interface IHeaderProps {
  readonly title: string;
}

const Header: Component<IHeaderProps> = (props) => (
  <header>
    <NavigationMobile />
    <div class={s.container}>
      <span class={s.masthead}>
        <A href="/">{props.title}</A>
      </span>
      <Navigation />
    </div>
  </header>
);

export default Header;
