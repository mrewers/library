import { useEffect } from 'preact/hooks';

import { setToken } from '~/utils/auth';

const TokenManager = (): null => {
  useEffect(() => {
    setToken('access_token');
    setToken('id_token');

    // Uses window.location to redirect rather than preact-route to force a refresh of the page so that the logout button appears
    window.location.href = '/add';
  }, []);

  return null;
};

export default TokenManager;
