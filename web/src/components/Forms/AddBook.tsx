import type { Component, JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import BookBase from './BookBase';
import { useBooks } from 'context/BookProvider';
import { getDateString } from 'utils/dates';
import { addItem } from 'utils/api';
import { handleFormInput } from 'utils/form-helpers';

interface IAddBookProps {
  readonly label?: string;
}

const AddBook: Component<IAddBookProps> = (props) => {
  const navigate = useNavigate();

  const [_, { addBook, createNewBook }] = useBooks();

  const [book, setBook] = createSignal(createNewBook());

  const overlayText = '';
  const saving = false;

  // Const [saving, setSaving] = useState(false);
  // const [overlayText, setOverlayText] = useState('Saving..');

  // const resetOverlay = (msg: string): void => {
  //   setOverlayText(msg);
  //   setTimeout((): void => {
  //     setSaving(false);
  //     setOverlayText('Saving...');
  //   }, 1000);
  // };

  // const resetForm = (): void => {
  //   resetOverlay('Successfully Saved!');
  //   setBook(initialState);
  // };

  const onSubmit = (e: Event): void => {
    e.preventDefault();
    
    addBook(book());

    navigate('/');
  //   setSaving(true);
  //   addItem({ book }, 'books')
  //     .then((data: IBookResponse) => {
  //       if (data !== undefined) {
  //         const added = {
  //           ...data.book,
  //           id: data.id,
  //         };

  //         dispatch({ type: 'ADD_BOOK', payload: { book: added } });
  //         resetForm();
  //       } else {
  //         resetOverlay('We encountered an error while saving :(');
  //       }
  //     })
  //     .catch(err => {
  //       resetOverlay('We encountered an error while saving :(');
  //       console.error(err);
  //     });
  };

  const onInput = ({ currentTarget }: InputEvent): void => {
    if (currentTarget === null) {
      return;
    }

    const [name, val] = handleFormInput(currentTarget as HTMLInputElement, book());

    setBook({
      ...book(),
      [name]: val,
    });
  };

  const onCancel = () => {
    navigate('/');
  }

  return (
    <BookBase
      book={book()}
      classes="add"
      label={props.label}
      overlayText={overlayText}
      saving={saving}
      onCancel={onCancel}
      onInput={onInput}
      onSubmit={onSubmit}
    />
  );
};

export default AddBook;
