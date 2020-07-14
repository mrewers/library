import { h, Fragment } from 'preact';

import Form from '~/components/Form/Form';
import LoginPrompt from '~/components/LoginPrompt/LoginPrompt';

import { isLoggedIn } from '~/utils/auth';

import './Pages.scss';

const Input = (): h.JSX.Element => (
  <Fragment>
    <h2 class="input-header sub-head">Add New Book</h2>
    {!isLoggedIn() && <LoginPrompt />}
    {isLoggedIn() && <Form />}
  </Fragment>
);

Input.displayName = 'Input';

export default Input;
