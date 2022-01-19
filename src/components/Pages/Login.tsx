import { useEffect } from 'preact/hooks';

import { login } from 'utils/auth';

const Login = (): null => {
  useEffect(() => {
    login('home');
  }, []);

  return null;
};

export default Login;
