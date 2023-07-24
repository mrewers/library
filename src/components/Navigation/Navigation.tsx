import type { Component } from 'solid-js';
import { Show } from 'solid-js';
import { A } from '@solidjs/router';

import Button from 'components/Button/Button';

import { logout, login, isLoggedIn } from 'utils/auth';

import s from './Navigation.module.scss';

const Navigation: Component = () => (
  <nav class={s.nav}>
    <ul class={s.items}>
      <li>
        <A class={s.link} href="/">
          Home
        </A>
      </li>
      <Show when={isLoggedIn()}>
        <li>
          <A class={s.link} href="/add">
            Add New
          </A>
        </li>
      </Show>
      <li>
        <A class={s.link} href="/retired">
          Jettisoned
        </A>
      </li>
    </ul>
    <Show
      when={isLoggedIn()}
      fallback={
        <Button color="plain" label="Log In" type="button" onClick={(): void => login()} />
      }
    >
      <Button color="plain" label="Log Out" type="button" onClick={(): void => logout()} />
    </Show>
  </nav>
);

export default Navigation;
