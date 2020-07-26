import { h } from 'preact';

import Button from '~components/Button/Button';

import { logout, isLoggedIn } from '~/utils/auth';

import './Navigation.scss';

const Navigation = (): h.JSX.Element => (
  <nav class="nav">
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
      <li>
        <a class="nav-link" href="/retired">
          Jettisoned
        </a>
      </li>
    </ul>
    {isLoggedIn() && (
      <Button color="plain" label="Log Out" type="button" onClick={(): void => logout()} />
    )}
  </nav>
);

Navigation.displayName = 'Navigation';

export default Navigation;
