import { Fragment, h, render } from 'preact';
import { useReducer, useEffect } from 'preact/hooks';
import { Router, Route } from 'preact-router';

import Header from './components/Header/Header';
import Stats from './components/Stats/Stats';
import Mask from './components/Mask/Mask';

import Books from './components/Pages/Books';
import Input from './components/Pages/Input';

import { FilterContext, filterReducer, initialFilterState } from './context/filterContext';
import { BookContext, bookReducer, initialBookState } from './context/bookContext';
import { fetchData } from './utils/api';

import './style/style.scss';

/* eslint-disable -- dynamic importing of a CommonJS modules causes all sorts of linting issues */
if (process.env.NODE_ENV !== 'production') {
  const devApiServer = require('./mirage');

  devApiServer({ environment: 'development' });
}
/* eslint-enable */

const App = (): h.JSX.Element => {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [bookState, bookDispatch] = useReducer(bookReducer, initialBookState);

  useEffect(() => {
    // Fetch book data
    fetchData('books')
      .then((data: TypeBookList) =>
        bookDispatch({ type: 'UPDATE_BOOKS', payload: { books: data } })
      )
      .catch(err => console.error(err));

    // Fetch reader data
    fetchData('readers')
      .then((data: readonly IReader[]) =>
        bookDispatch({ type: 'UPDATE_READER_DATA', payload: { data } })
      )
      .catch(err => console.error(err));
  }, []);

  return (
    <Fragment>
      <Header title="Library" />
      <div class="page-container">
        <Mask />
        <BookContext.Provider value={{ dispatch: bookDispatch, state: bookState }}>
          <FilterContext.Provider value={{ dispatch: filterDispatch, state: filterState }}>
            <Stats />
            <main>
              <Router>
                <Route component={Books} path="/" />
                <Route component={Input} path="/add" />
              </Router>
            </main>
          </FilterContext.Provider>
        </BookContext.Provider>
      </div>
    </Fragment>
  );
};

App.displayName = 'App';

render(<App />, document.getElementById('root'));
