import { h } from 'preact';

import Navigation from '../Navigation/Navigation';

const Header = ({ title }: { title: string }) => (
  <header>
    <h1>{title}</h1>
    <Navigation />
  </header>
);

export default Header;
