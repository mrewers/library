import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import type { Component } from 'solid-js';

import { getAuthRedirect, setToken } from 'utils/auth';

const Auth: Component = () => {
  const navigate = useNavigate();

  createEffect(() => {
    setToken('access_token');
    setToken('id_token');

    const redirect = getAuthRedirect()

    navigate(`/${redirect}`);
  });

  return null;
};

export default Auth;
