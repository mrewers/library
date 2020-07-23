import * as dotenv from 'dotenv';

import { Fragment, h, render } from 'preact';
import { useReducer, useEffect } from 'preact/hooks';
import { Router, Route } from 'preact-router';

import Auth from '~/components/Auth/Auth';
import Header from '~/components/Header/Header';
import EditBook from '~/components/Forms/EditBook';
import Mask from '~/components/Mask/Mask';
import Modal from '~/components/Modal/Modal';
import Stats from '~/components/Stats/Stats';

import Books from '~/components/Pages/Books';
import FourOhFour from '~/components/Pages/FourOhFour';
import Input from '~/components/Pages/Input';
import Privacy from '~/components/Pages/Privacy';

import { BookContext, bookReducer, initialBookState } from '~/context/bookContext';
import { FilterContext, filterReducer, initialFilterState } from '~/context/filterContext';
import { ModalContext, modalReducer, initialModalState } from '~/context/modalContext';
import { fetchData } from '~/utils/api';

import './style/style.scss';

// Load environmental variables
dotenv.config();

/* eslint-disable -- dynamic importing of a CommonJS modules causes all sorts of linting issues */
if (process.env.NODE_ENV !== 'production') {
  const devApiServer = require('./mirage');

  devApiServer({ environment: 'development' });
}
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
      <div class="page-container">
        <Mask />
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
                  <Route component={Input} path="/add" />
                  <Route component={Auth} path="/auth" />
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
