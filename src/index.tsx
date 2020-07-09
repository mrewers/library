import { Fragment, h, render } from 'preact';
import Router from 'preact-router';

import Header from './components/Header/Header';
import Stats from './components/Stats/Stats';

import Books from './components/Pages/Books';
import Input from './components/Pages/Input';

import { mockList } from '../__mocks__/data';

const App = () => (
  <Fragment>
    <Header title="Library" />
    <Stats list={mockList} />
    <Router>
      <Books list={mockList} path="/" />
      <Input path="/add" />
    </Router>
  </Fragment>
);

render(<App />, document.getElementById('root'));
