import { h, Fragment } from 'preact';

import Form from '~/components/Form/Form';

import './Pages.scss';

const Input = (): h.JSX.Element => (
  <Fragment>
    <h2 class="input-header sub-head">Add New Book</h2>
    <Form />
  </Fragment>
);

Input.displayName = 'Input';

export default Input;
