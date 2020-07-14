import { h } from 'preact';
import { useEffect } from 'preact/hooks';

import { setIdToken, setAccessToken } from '~/utils/auth';

const TokenManager = (): null => {
  useEffect(() => {
    setAccessToken();
    setIdToken();
    window.location.href = '/add';
  }, []);

  return null;
};

export default TokenManager;
