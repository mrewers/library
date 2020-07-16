import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import Form from '~/components/Form/Form';
import LoginPrompt from '~/components/LoginPrompt/LoginPrompt';

import { isLoggedIn } from '~/utils/auth';

import './Pages.scss';

const Input = (): h.JSX.Element => {
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const { hash } = window.location;

    if (hash === '#login-error') {
      setLoginError(true);
    }
  }, []);

  return (
    <Fragment>
      <h2 class="input-header sub-head">Add New Book</h2>
      {!isLoggedIn() && <LoginPrompt error={loginError} />}
      {!loginError && isLoggedIn() && <Form />}
    </Fragment>
  );
};

Input.displayName = 'Input';

export default Input;
