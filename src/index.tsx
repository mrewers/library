import { Fragment, h, render } from 'preact';
import { Router, Route } from 'preact-router';

import Header from './components/Header/Header';
import Stats from './components/Stats/Stats';

import Books from './components/Pages/Books';
import Input from './components/Pages/Input';

import './style/style.scss';

import { mockList } from '../__mocks__/data';

const renderBooks = (): h.JSX.Element => <Books list={mockList} />;

const App = (): h.JSX.Element => (
  <Fragment>
    <Header title="Library" />
    <div class="page-container">
      <Stats list={mockList} />
      <main>
        <Router>
          <Route component={renderBooks} path="/" />
          <Route component={Input} path="/add" />
        </Router>
      </main>
    </div>
  </Fragment>
);

App.displayName = 'App';
renderBooks.displayName = 'RenderBooks';

render(<App />, document.getElementById('root'));
