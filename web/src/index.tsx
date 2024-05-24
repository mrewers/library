import 'solid-devtools';

/* @refresh reload */
import { render } from 'solid-js/web';
import { createEffect, createSignal } from 'solid-js';

import App from 'components/App';

import { BookProvider } from 'context/BookProvider';
import { FilterProvider } from 'context/FilterProvider';
import { ReaderProvider } from 'context/ReaderProvider';

import { buildQuery } from 'utils/api';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const Library = () => {
  const [books, setBooks] = createSignal([] as IBook[])
  const [readers, setReaders] = createSignal([] as IReader[])

  const [loadingBooks, setLoadingBooks] = createSignal(true);
  const [loadingReaders, setLoadingReaders] = createSignal(true);

  createEffect(async () => {
    const { data } = await buildQuery('readers', null);

    if (data) {
      setReaders(data);
      setLoadingReaders(false);
    }
  });

  createEffect(async () => {
    const { data } = await buildQuery('books', null);

    if ( data ) {
      setBooks(data);
      setLoadingBooks(false);
    }
  });

  return (
  <ReaderProvider loading={loadingReaders()} readers={readers()}>
    <BookProvider loading={loadingBooks()} books={books()}>
      <FilterProvider>
        <App />
      </FilterProvider>
    </BookProvider>
  </ReaderProvider>
)};

render( Library, root! );