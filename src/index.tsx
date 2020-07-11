import { Fragment, h, render } from 'preact';
import { useReducer, useEffect } from 'preact/hooks';
import { Router, Route } from 'preact-router';

import Header from './components/Header/Header';
import Stats from './components/Stats/Stats';

import Books from './components/Pages/Books';
import Input from './components/Pages/Input';

import { FilterContext, filterReducer, initialFilterState } from './context/filterContext';
import { BookContext, bookReducer, initialBookState } from './context/bookContext';
import { devApiServer, EnvOptions } from './mirage';
import { fetchData } from './utils/api';

import './style/style.scss';

devApiServer({ environment: EnvOptions.DEV });

const App = (): h.JSX.Element => {
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [bookState, bookDispatch] = useReducer(bookReducer, initialBookState);

  useEffect(() => {
    // Fetch book data
    fetchData('books')
      .then((data: TypeBookList) => bookDispatch({ type: 'books', payload: { books: data } }))
      .catch(err => console.error(err));

    // Fetch reader data
    fetchData('readers')
      .then((data: readonly string[]) =>
        bookDispatch({ type: 'readers', payload: { readers: data } })
      )
      .catch(err => console.error(err));
  }, []);

  return (
    <Fragment>
      <Header title="Library" />
      <div class="page-container">
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
