import { h } from 'preact';

import './Navigation.scss';

const Navigation = (): h.JSX.Element => (
  <nav>
    <ul class="nav-items">
      <li>
        <a class="nav-link" href="/">
          Home
        </a>
      </li>
      <li>
        <a class="nav-link" href="/add">
          Add New
        </a>
      </li>
    </ul>
  </nav>
);

Navigation.displayName = 'Navigation';

export default Navigation;
