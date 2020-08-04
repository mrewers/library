import { h } from 'preact';

import Button from '~components/Button/Button';

import { logout, isLoggedIn } from '~/utils/auth';

import s from './Navigation.scss';

const Navigation = (): h.JSX.Element => (
  <nav class={s.nav}>
    <ul class={s.items}>
      <li>
        <a class={s.link} href="/">
          Home
        </a>
      </li>
      <li>
        <a class={s.link} href="/add">
          Add New
        </a>
      </li>
      <li>
        <a class={s.link} href="/retired">
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
