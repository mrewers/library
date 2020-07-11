import { Fragment, h, render } from 'preact';
import { useReducer, useEffect } from 'preact/hooks';
import { Router, Route } from 'preact-router';

import Header from './components/Header/Header';
import Stats from './components/Stats/Stats';

import Books from './components/Pages/Books';
import Input from './components/Pages/Input';

import { FilterContext, filterReducer, initialFilterState } from './context/filterContext';
import { BookContext, bookReducer, initialBookState } from './context/bookContext';
import { devApiServer } from './mirage';

import './style/style.scss';

import { mockList } from '../__mocks__/data';

/* eslint-disable react/no-multi-comp */
const renderBooks = (): h.JSX.Element => <Books list={mockList} />;

devApiServer({ environment: 'development' });

const App = (): h.JSX.Element => {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [bookState, bookDispatch] = useReducer(bookReducer, initialBookState);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then((data: readonly string[]) => bookDispatch({ type: 'books', payload: { books: data } }))
      .catch(err => console.error(err));
  }, []);

  return (
    <Fragment>
      <Header title="Library" />
      <div class="page-container">
        <BookContext.Provider value={{ dispatch: bookDispatch, state: bookState }}>
          <FilterContext.Provider value={{ dispatch: filterDispatch, state: filterState }}>
            <Stats list={mockList} />
            <main>
              <Router>
                <Route component={renderBooks} path="/" />
                <Route component={Input} path="/add" />
              </Router>
            </main>
          </FilterContext.Provider>
        </BookContext.Provider>
      </div>
    </Fragment>
  );
};
/* eslint-enable react/no-multi-comp */

App.displayName = 'App';

renderBooks.displayName = 'RenderBooks';

render(<App />, document.getElementById('root'));
