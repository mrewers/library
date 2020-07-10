import { h } from 'preact';

import Navigation from '../Navigation/Navigation';

import './Header.scss';

interface IHeaderProps {
  readonly title: string;
}

const Header = ({ title }: IHeaderProps): h.JSX.Element => (
  <header>
    <div class="head-container">
      <h1>
        <a href="/">{title}</a>
      </h1>
      <Navigation />
    </div>
  </header>
);

Header.displayName = 'Header';

export default Header;
