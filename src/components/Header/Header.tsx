import { h } from 'preact';

import Navigation from '../Navigation/Navigation';

import './Header.scss';

const Header = ({ title }: { title: string }) => (
  <header>
    <div class="head-container">
      <h1>
        <a href="/">{title}</a>
      </h1>
      <Navigation />
    </div>
  </header>
);

export default Header;
