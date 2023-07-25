import type { Component, JSX } from 'solid-js';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import BookBase from './BookBase';
import { addItem, fetchData, updateItem, deleteItem } from 'utils/api';
import { getDateString } from 'utils/dates';
import { handleFormInput } from 'utils/form-helpers';
import { useBooks } from 'context/BookProvider';

interface IEditBookProps {
  readonly id: string;
  readonly label?: string;
  readonly readonly?: boolean;
}

const EditBook: Component<IEditBookProps> = (props) => {
  const navigate = useNavigate();
  
  const [overlayText, setOverlayText] = createSignal('Saving..');
  const [saving, setSaving] = createSignal(false);

  const [_, {getBook, removeBook, retireBook, updateBook}] = useBooks();

  const [book, setBook] = createSignal(getBook(props.id));

  const resetOverlay = (msg: string, close = false): void => {
    setOverlayText(msg);
    setTimeout((): void => {
      setSaving(false);
      setOverlayText('Saving...');
      // if (close) {
      //   dispatch({ type: 'CLOSE_MODAL' });
      // }
    }, 1000);
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

  const onDelete = async (): Promise<void> => {
    // setSaving(true);

    // await deleteItem('books', id).catch(err => console.error(err));

    // bookDispatch({ type: 'DELETE_BOOK', payload: { id } });
    // resetOverlay('Successfully Deleted!', true);
    removeBook(props.id)
    navigate('/');
  };

  const onRetire = async (): Promise<void> => {
    updateBook(props.id, book());
    retireBook(props.id);
  //   setSaving(true);

  //   const date = getDateString();
  //   const retired = { ...book, dateRetired: date };

  //   await addItem({ book: retired }, 'retired').catch(err => console.error(err));
  //   bookDispatch({ type: 'ADD_RETIRED', payload: { book: retired } });

  //   await deleteItem('books', id).catch(err => console.error(err));
  //   bookDispatch({ type: 'DELETE_BOOK', payload: { id } });

  //   resetOverlay('Successfully Jettisoned!', true);
    navigate('/');
  };

  const onCancel = () => {
    navigate('/');
  }

  const onSubmit = (e: Event): void => {
    e.preventDefault();
    // setSaving(true);
    // updateItem({ book }, 'books', id)
    //   .then((data: IBookResponse) => {
    //     if (data !== undefined) {
    //       bookDispatch({ type: 'UPDATE_BOOK', payload: { book: data.book, id } });
    //       resetOverlay('Successfully Saved!');
    //       dispatch({ type: 'CLOSE_MODAL' });
    //     } else {
    //       resetOverlay('We encountered an error while saving :(');
    //     }
    //   })
    //   .catch(err => {
    //     resetOverlay('We encountered an error while saving :(');
    //     console.error(err);
    //   });
    updateBook(props.id, book());
    
    navigate('/');
  };

  return (
    <BookBase
      book={book()}
      label={props.label}
      overlayText={overlayText()}
      saving={saving()}
      onCancel={onCancel}
      onDelete={onDelete}
      onInput={onInput}
      onRetire={onRetire}
      onSubmit={onSubmit}
      readonly={props.readonly}
    />
  );
};

export default EditBook;
