import { createEffect, createSignal, Show } from 'solid-js';
import type { Component } from 'solid-js';

import AddBook from 'components/Forms/AddBook';
import Layout from 'components/Layout/Layout';
import LoginPrompt from 'components/LoginPrompt/LoginPrompt';

import { isLoggedIn } from 'utils/auth';

import s from './Pages.module.scss';

const BookAdd: Component = () => {
  const [loginError, setLoginError] = createSignal(false);

  createEffect(() => {
    const { hash } = window.location;

    if (hash === '#login-error') {
      setLoginError(true);
    }
  });

  return (
    <Layout stats={false}>
      <h1 class={s.subhead}>Add New Book</h1>
      <Show
        when={isLoggedIn() && !loginError()}
        fallback={
          <LoginPrompt callback='add' error={loginError()} message='Add Books'/>
        }
      >
        <AddBook />
      </Show>
    </Layout>
  );
};

export default BookAdd;
