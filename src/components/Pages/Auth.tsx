import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { setToken } from 'utils/auth';

const Auth = (): h.JSX.Element => {
  useEffect(() => {
    setToken('access_token');
    setToken('id_token');

    const { pathname } = window.location;
    const path = pathname.replace('auth/', '');
    console.log(path);

    // Uses window.location to redirect rather than preact-route to force a refresh of the page so that the logout button appears
    window.location.href = path;
  }, []);

  return null;
};

Auth.displayName = 'Auth';

export default Auth;
