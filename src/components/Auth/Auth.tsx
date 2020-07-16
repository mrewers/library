import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import { setToken } from '~/utils/auth';

const TokenManager = (): null => {
  useEffect(() => {
    setToken('access_token');
    setToken('id_token');

    route('/add', true);
  }, []);

  return null;
};

export default TokenManager;
