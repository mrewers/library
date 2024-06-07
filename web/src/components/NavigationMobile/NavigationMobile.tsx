import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { A, useLocation } from '@solidjs/router';
import { createScrollPosition } from "@solid-primitives/scroll";

import Button from 'components/Button/Button';
import MenuIcon from 'components/Icons/MenuIcon';
import XCircleIcon from 'components/Icons/XCircleIcon';

import { logout, login, isLoggedIn } from 'utils/auth';

import type { Component } from 'solid-js';

import s from './NavigationMobile.module.scss';

const Navigation: Component = () => {
  // Identify the current page in order to highlight the active nav link.
  const location = useLocation();
  const pathname = createMemo(() => location.pathname);

  // Handle the navigation drawer.
  const [showNav, setShowNav] = createSignal(false);
  const [scrollOnFreeze, setScrollOnFreeze] = createSignal(0);
  
  // Keep track of how far the user has scrolled.
  const windowScroll = createScrollPosition();
  
  // Make sure the body is not frozen when navigating to a new page.
  createEffect(() => freezeBody(false));

  /**
   * Prevent the user from scrolling the background
   * content while the navigation drawer is open.
   * @param freeze Whether or not the background should be frozen.
   */
  const freezeBody = (freeze: boolean) => {
    const body = document.body;

    if (freeze) {
      body.style.position= 'fixed';

      // Save the position on the page the user scrolled
      // to before opening the navigation drawer.
      setScrollOnFreeze(windowScroll.y)
    } else {
      body.style.position= 'unset';

      // Return to the position on the page the user previously scrolled to.
      window.scrollTo(0, scrollOnFreeze());
    }
  }

  /**
   * Open/close the navigation drawer.
   */
  const handleNavToggle = () => {
    if (showNav()) {
      freezeBody(false);
    } else {
      freezeBody(true);
    }

    setShowNav(!showNav())
  };

  return (
    <nav class={s.nav} role="navigation">
      <button
        aria-controls="mobile-menu"
        aria-expanded={showNav()}
        class={s.toggle}
        onClick={handleNavToggle}
      >
        <span>Menu</span>
        <Show when={!showNav()}>
          <MenuIcon stroke="2.5"/>
        </Show>
        <Show when={showNav()}>
        <XCircleIcon stroke="2.5"/>
        </Show>
      </button>
      <Show when={showNav()}>
        <div class={s.drawer}>
          <ul class={s.items} id="mobile-menu">
            <li>
              <A
                class={`${s.link} ${pathname() === "/" ? s.active : ""}`}
                href="/"
              >
                Home
              </A>
            </li>
            <Show when={isLoggedIn()}>
              <li>
                <A
                  class={`${s.link} ${pathname() === "/add" ? s.active : ""}`}
                  href="/add"
                >
                  Add New
                </A>
              </li>
            </Show>
            <li>
              <A
                class={`${s.link} ${pathname() === "/retired" ? s.active : ""}`}
                href="/retired"
              >
                Jettisoned
              </A>
            </li>
            <li>
            <Show
              when={isLoggedIn()}
              fallback={
                <Button
                  classes={s.logout}
                  color="link"
                  label="Log In"
                  type="button"
                  onClick={() => login()}
                />
              }
            >
              <Button
                classes={s.logout}
                color="link"
                label="Log Out"
                type="button"
                onClick={() => logout()}
               />
            </Show>
            </li>
          </ul>
          
        </div>
      </Show>
    </nav>
  )
};

export default Navigation;
