import { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import AddBook from 'components/Forms/AddBook';
import LoginPrompt from 'components/LoginPrompt/LoginPrompt';

import { isLoggedIn } from 'utils/auth';

import s from './Pages.module.scss';

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
      <h2 class={`${s['input-header']} ${s.subhead}`}>Add New Book</h2>
      {!isLoggedIn() && <LoginPrompt error={loginError} />}
      {!loginError && isLoggedIn() && <AddBook />}
    </Fragment>
  );
};

Input.displayName = 'Input';

export default Input;
