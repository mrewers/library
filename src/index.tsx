import 'solid-devtools';

/* @refresh reload */
import { render } from 'solid-js/web';

import App from 'components/App';
import { BookProvider } from 'context/BookProvider';
import { FilterProvider } from 'context/FilterProvider';
import { ReaderProvider } from 'context/ReaderProvider';
import {mockBooks, mockReaders} from 'mocks/data';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

const Library = () => (
  <BookProvider books={mockBooks}>
    <ReaderProvider readers={mockReaders}>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ReaderProvider>
  </BookProvider>
);

render( Library, root! );