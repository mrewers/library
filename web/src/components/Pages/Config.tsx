import { createEffect, createSignal, Show } from 'solid-js';

import Readers from 'components/Forms/Readers';
import Layout from 'components/Layout/Layout';
import LoginPrompt from 'components/LoginPrompt/LoginPrompt';

import { isLoggedIn } from 'utils/auth';

import type { Component } from 'solid-js';

import s from './Pages.module.scss';

const Config: Component = () => {
  const [loginError, setLoginError] = createSignal(false);

  createEffect(() => {
    const { hash } = window.location;

    if (hash === '#login-error') {
      setLoginError(true);
    }
  });

  return (
    <Layout stats={false}>
      <h1 class={s.subhead}>Configure This Site</h1>
      <Show
        when={isLoggedIn() && !loginError()}
        fallback={
          <LoginPrompt callback='config' error={loginError()} message='Manage Configurations'/>
        }
      >
        <Readers />
      </Show>
    </Layout>
  );
};

export default Config;