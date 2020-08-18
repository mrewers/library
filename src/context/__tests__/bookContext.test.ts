import { initialBookState, bookReducer } from '../bookContext';

import { bookOne, bookTwo, bookThree, books } from '~/mocks/books';

const addedBookState: IBookState = {
  ...initialBookState,
  books: [bookOne],
};

const addedBooksState: IBookState = {
  ...initialBookState,
  books,
};

const addedRetiredState: IBookState = {
  ...initialBookState,
  retired: [bookOne],
};

const updatedBookOne = {
  ...bookOne,
  author: 'Ms. Cornell',
};

const updatedBookState = {
  ...addedBooksState,
  books: [updatedBookOne, bookTwo, bookThree],
};

const addBook = JSON.stringify(addedBookState);
const addBooks = JSON.stringify(addedBooksState);
const updateBook = JSON.stringify(updatedBookState);

const addRetired = JSON.stringify(addedRetiredState);
const expectedInitial = JSON.stringify(initialBookState);

describe('bookReducer', () => {
  it('adds provided book to the books array when the action is "ADD_BOOK" and deletes it when the action is "DELETE_BOOK"', () => {
    const action: IBookAction = {
      type: 'ADD_BOOK',
      payload: {
        book: bookOne,
      },
    };

    const updatedState = bookReducer(initialBookState, action);

    expect(JSON.stringify(updatedState)).toEqual(addBook);

    const resetAction: IBookAction = {
      type: 'DELETE_BOOK',
      payload: {
        id: 'abcd',
      },
    };

    const resetState = bookReducer(addedBookState, resetAction);

    expect(JSON.stringify(resetState)).toEqual(expectedInitial);
  });

  it('updates the books array when the action is "UPDATE_BOOKS" or "UPDATE_BOOK"', () => {
    const multiAction: IBookAction = {
      type: 'UPDATE_BOOKS',
      payload: {
        books: books,
      },
    };

    const multiUpdate = bookReducer(initialBookState, multiAction);

    expect(JSON.stringify(multiUpdate)).toEqual(addBooks);

    const singleAction: IBookAction = {
      type: 'UPDATE_BOOK',
      payload: {
        book: updatedBookOne,
        id: 'abcd',
      },
    };

    const singleUpdate = bookReducer(addedBooksState, singleAction);

    expect(JSON.stringify(singleUpdate)).toEqual(updateBook);
  });

  it('adds the provided book to the retired list when the action type is "ADD_RETIRED"', () => {
    const action: IBookAction = {
      type: 'ADD_RETIRED',
      payload: {
        retiredBook: bookOne,
      },
    };

    const updatedState = bookReducer(initialBookState, action);

    expect(JSON.stringify(updatedState)).toEqual(addRetired);
  });

  // case 'UPDATE_READER_DATA':
  //   return {
  //     ...state,
  //     readerData: payload.data,
  //     readers: getReadersList(payload.data),
  //   };
  // case 'UPDATE_READERS':
  //   return {
  //     ...state,
  //     readers: payload.readers,
  //   };
  // case 'UPDATE_RETIRED':
  //   return {
  //     ...state,
  //     retired: payload.retired,
});
