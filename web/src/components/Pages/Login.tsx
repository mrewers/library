import { createEffect } from 'solid-js';
import type { Component } from 'solid-js';

import { login } from 'utils/auth';

const Login: Component = (): null => {
  createEffect(() => {
    login('/');
  });

  return null;
};

export default Login;
