import { Show } from 'solid-js';
import { A } from '@solidjs/router';

import Button from 'components/Button/Button';

import { logout, login, isLoggedIn } from 'utils/auth';

import type { Component } from 'solid-js';

import s from './Navigation.module.scss';

/**
 * A navigation element with a list of links to the main pages on the site.
 * Appears in the page header on tablet and above sized screens.
 * @returns A SolidJS JSX component.
 */
const Navigation: Component = () => (
  <nav class={s.nav} role="navigation">
    <ul class={s.items}>
      <li class={s.item}>
        <A class={s.link} href="/">
          Home
        </A>
      </li>
      <Show when={isLoggedIn()}>
        <li class={s.item}>
          <A class={s.link} href="/add">
            Add New
          </A>
        </li>
      </Show>
      <li class={s.item}>
        <A class={s.link} href="/retired">
          Jettisoned
        </A>
      </li>
    </ul>
    <Show
      when={isLoggedIn()}
      fallback={
        <Button
          color="link"
          label="Log In"
          type="button"
          onClick={() => login()}
        />
      }
    >
      <Button
        color="link"
        label="Log Out"
        type="button"
        onClick={() => logout()}
      />
    </Show>
  </nav>
);

export default Navigation;
