import { Fragment, h, render } from 'preact';
import Router from 'preact-router';

import Books from './components/Pages/Books';
import Input from './components/Pages/Input';

const App = () => (
  <Fragment>
    <h1>Hello from Preact and Typescript!</h1>
    <Router>
      <Books path="/" />
      <Input path="/add" />
    </Router>
  </Fragment>
);

render(<App />, document.getElementById('root'));
