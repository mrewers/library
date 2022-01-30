import * as dotenv from 'dotenv';
import { Fragment, h, render } from 'preact';
import { useEffect, useReducer } from 'preact/hooks';
import { Route, Router } from 'preact-router';

import s from 'style/style.module.scss';
import Header from 'components/Header/Header';
import EditBook from 'components/Forms/EditBook';
import Modal from 'components/Modal/Modal';
import Stats from 'components/Stats/Stats';
import Auth from 'components/Pages/Auth';
import Books from 'components/Pages/Books';
import FourOhFour from 'components/Pages/FourOhFour';
import Input from 'components/Pages/Input';
import Login from 'components/Pages/Login';
import Privacy from 'components/Pages/Privacy';
import Retired from 'components/Pages/Retired';
import { BookContext, bookReducer, initialBookState } from 'context/bookContext';
import { FilterContext, filterReducer, initialFilterState } from 'context/filterContext';
import { initialModalState, ModalContext, modalReducer } from 'context/modalContext';
import { fetchData } from 'utils/api';

// Load environmental variables
dotenv.config();

/* eslint-disable -- dynamic importing of a CommonJS modules causes all sorts of linting issues */
// if (process.env.NODE_ENV !== 'production') {
//   const devApiServer = require('./mirage');

//   devApiServer({ environment: 'development' });
// }
/* eslint-enable */

const App = (): h.JSX.Element => {
  const [bookState, bookDispatch] = useReducer(bookReducer, initialBookState);
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [modalState, modalDispatch] = useReducer(modalReducer, initialModalState);

  useEffect(() => {
    // Fetch book data
    fetchData('books')
      .then((data: IBooksResponse) =>
        bookDispatch({ type: 'UPDATE_BOOKS', payload: { books: data.books } })
      )
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // Fetch reader data
    fetchData('readers')
      .then((data: IReadersResponse) =>
        bookDispatch({ type: 'UPDATE_READER_DATA', payload: { data: data.readers } })
      )
      .catch(err => console.error(err));
  }, []);

  return (
    <Fragment>
      <Header title="Library" />
      <div className={s['page-container']}>
        <BookContext.Provider value={{ dispatch: bookDispatch, state: bookState }}>
          <FilterContext.Provider value={{ dispatch: filterDispatch, state: filterState }}>
            <ModalContext.Provider value={{ dispatch: modalDispatch, state: modalState }}>
              <Modal>
                <EditBook label="Update Book" />
              </Modal>
              <Stats />
              <main>
                <Router>
                  <Route component={Books} path="/" />
                  <Route component={Books} path="/home" />
                  <Route component={Auth} path="/auth/:path" />
                  <Route component={Input} path="/add" />
                  <Route component={Login} path="/login" />
                  <Route component={Retired} path="/retired" />
                  <Route component={Privacy} path="/privacy" />
                  <Route component={FourOhFour} default type="404" />
                </Router>
              </main>
            </ModalContext.Provider>
          </FilterContext.Provider>
        </BookContext.Provider>
      </div>
    </Fragment>
  );
};

App.displayName = 'App';

render(<App />, document.getElementById('root'));
