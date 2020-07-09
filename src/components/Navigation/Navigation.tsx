import { h } from 'preact';

import './Navigation.scss';

const Navigation = () => (
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

export default Navigation;
