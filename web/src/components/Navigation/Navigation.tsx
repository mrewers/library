import { createMemo, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';

import Button from 'components/Button/Button';

import { logout, login, isLoggedIn } from 'utils/auth';

import type { Component } from 'solid-js';

import s from './Navigation.module.scss';

const Navigation: Component = () => {
  // Identify the current page in order to highlight the active nav link.
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  return (
    <nav class={s.nav} role="navigation">
      <ul class={s.items}>
        <li class={s.item}>
          <A class={`${s.link} ${pathname() === "/" ? s.active : ""}`} href="/">
            Home
          </A>
        </li>
        <Show when={isLoggedIn()}>
          <li class={s.item}>
            <A class={`${s.link} ${pathname() === "/add" ? s.active : ""}`} href="/add">
              Add New
            </A>
          </li>
        </Show>
        <li class={s.item}>
          <A class={`${s.link} ${pathname() === "/retired" ? s.active : ""}`} href="/retired">
            Jettisoned
          </A>
        </li>
      </ul>
      <Show
        when={isLoggedIn()}
        fallback={
          <Button color="link" label="Log In" type="button" onClick={() => login()} />
        }
      >
        <Button color="link" label="Log Out" type="button" onClick={() => logout()} />
      </Show>
    </nav>
  )
};

export default Navigation;
