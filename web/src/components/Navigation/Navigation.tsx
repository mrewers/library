import { createMemo, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

import Button from 'components/Button/Button';

import { logout, login, isLoggedIn } from 'utils/auth';

import type { Component } from 'solid-js';

import s from './Navigation.module.scss';

const Navigation: Component = () => {
  const location = useLocation();

  const pathname = createMemo(() => location.pathname);

  return (
    <nav class={s.nav}>
      <ul class={s.items}>
        <li>
          <A class={`${s.link} ${pathname() === "/" ? s.active : ""}`} href="/">
            Home
          </A>
        </li>
        <Show when={isLoggedIn()}>
          <li>
            <A class={`${s.link} ${pathname() === "/add" ? s.active : ""}`} href="/add">
              Add New
            </A>
          </li>
        </Show>
        <li>
          <A class={`${s.link} ${pathname() === "/retired" ? s.active : ""}`} href="/retired">
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
  )
};

export default Navigation;
