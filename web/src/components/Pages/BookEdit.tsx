import { createEffect, createSignal, Show } from 'solid-js';
import { useParams } from "@solidjs/router";

import EditBook from 'components/Forms/EditBook';
import Layout from 'components/Layout/Layout';
import LoginPrompt from 'components/LoginPrompt/LoginPrompt';

import { isLoggedIn } from 'utils/auth';

import type { Component } from 'solid-js';

import s from './Pages.module.scss';

const BookEdit: Component = () => {
  const params = useParams();

  const [loginError, setLoginError] = createSignal(false);

  createEffect(() => {
    const { hash } = window.location;

    if (hash === '#login-error') {
      setLoginError(true);
    }
  });

  return (
    <Layout stats={false}>
      <h1 class={s.subhead}>Edit Book</h1>
      <Show
        when={!isLoggedIn() || loginError()}
      >
        <LoginPrompt callback={`book/${params.id}`} error={loginError()} message='Edit This Book'/>
      </Show>
        <EditBook id={params.id} readonly={!isLoggedIn()}/>
    </Layout>
  );
};

export default BookEdit;
