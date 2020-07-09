import { Fragment, h, render } from 'preact';

import List from './components/List/List';
import Form from './components/Form/Form';

const App = () => (
  <Fragment>
    <h1>Hello from Preact and Typescript!</h1>
    <List filter="read" />
    <Form />
  </Fragment>
);

render(<App />, document.getElementById('root'));
