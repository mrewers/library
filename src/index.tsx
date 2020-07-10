import { Fragment, h, render } from 'preact';
import { useReducer } from 'preact/hooks';
import { Router, Route } from 'preact-router';

import Header from './components/Header/Header';
import Stats from './components/Stats/Stats';

import Books from './components/Pages/Books';
import Input from './components/Pages/Input';

import { FilterContext, filterReducer, initialFilterState } from './context/filterContext';

import './style/style.scss';

import { mockList } from '../__mocks__/data';

/* eslint-disable react/no-multi-comp */
const renderBooks = (): h.JSX.Element => <Books list={mockList} />;

const App = (): h.JSX.Element => {
  const [state, dispatch] = useReducer(filterReducer, initialFilterState);

  return (
    <Fragment>
      <Header title="Library" />
      <div class="page-container">
        <FilterContext.Provider value={{ dispatch, state }}>
          <Stats list={mockList} />
          <main>
            <Router>
              <Route component={renderBooks} path="/" />
              <Route component={Input} path="/add" />
            </Router>
          </main>
        </FilterContext.Provider>
      </div>
    </Fragment>
  );
};
/* eslint-enable react/no-multi-comp */

App.displayName = 'App';

renderBooks.displayName = 'RenderBooks';

render(<App />, document.getElementById('root'));
