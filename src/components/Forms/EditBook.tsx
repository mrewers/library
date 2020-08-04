import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import BookBase from './BookBase';

import { addItem, fetchData, updateItem, deleteItem } from '~/utils/api';
import { getDateString } from '~/utils/dates';
import { toggleArrayValues } from '~/utils/form-helpers';
import { BookContext } from '~/context/bookContext';
import { ModalContext } from '~/context/modalContext';

interface IEditBookProps {
  readonly label?: string;
}

const EditBook = ({ label }: IEditBookProps): h.JSX.Element => {
  const initialState: IBook = {
    acquired: 'no',
    author: '',
    date: getDateString(),
    read: [],
    title: '',
  };

  const {
    dispatch,
    state: { id },
  } = useContext(ModalContext);

  const { dispatch: bookDispatch } = useContext(BookContext);

  const closeModal = (): void => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const [book, setBook] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [overlayText, setOverlayText] = useState('Saving..');
  const [saving, setSaving] = useState(false);

  const resetOverlay = (msg: string, close = false): void => {
    setOverlayText(msg);
    setTimeout((): void => {
      setSaving(false);
      setOverlayText('Saving...');
      if (close) {
        dispatch({ type: 'CLOSE_MODAL' });
      }
    }, 1000);
  };

  useEffect(() => {
    if (id) {
      // Fetch book data
      fetchData(`books/${id}`)
        .then((data: IBookResponse) => {
          const { book } = data;
          setBook({
            acquired: book.acquired,
            author: book.author || '',
            date: book.date || '',
            read: [...book.read],
            title: book.title || '',
          });

          setLoading(false);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  const onInput = ({ currentTarget }: TypeEventInput): void => {
    const { name, value } = currentTarget;

    setBook({
      ...book,
      [name]: name === 'read' ? toggleArrayValues(book.read, value) : value,
    });
  };

  const onDelete = async (): Promise<void> => {
    setSaving(true);

    await deleteItem('books', id).catch(err => console.error(err));

    bookDispatch({ type: 'DELETE_BOOK', payload: { id } });
    resetOverlay('Successfully Deleted!', true);
  };

  const onRetire = async (): Promise<void> => {
    setSaving(true);

    const date = getDateString();
    const retired = { ...book, dateRetired: date };

    await addItem({ book: retired }, 'retired').catch(err => console.error(err));
    bookDispatch({ type: 'ADD_RETIRED', payload: { book: retired } });

    await deleteItem('books', id).catch(err => console.error(err));
    bookDispatch({ type: 'DELETE_BOOK', payload: { id } });

    resetOverlay('Successfully Jettisoned!', true);
  };

  const onSubmit = (e: Event): void => {
    setSaving(true);
    updateItem({ book }, 'books', id)
      .then((data: IBookResponse) => {
        if (data !== undefined) {
          bookDispatch({ type: 'UPDATE_BOOK', payload: { book: data.book, id } });
          resetOverlay('Successfully Saved!');
          dispatch({ type: 'CLOSE_MODAL' });
        } else {
          resetOverlay('We encountered an error while saving :(');
        }
      })
      .catch(err => {
        resetOverlay('We encountered an error while saving :(');
        console.error(err);
      });
    e.preventDefault();
  };

  return (
    <BookBase
      book={book}
      hasCancel
      hasDelete
      hasRetire
      label={label}
      loading={loading}
      overlayText={overlayText}
      saving={saving}
      onCancel={closeModal}
      onDelete={onDelete}
      onInput={onInput}
      onRetire={onRetire}
      onSubmit={onSubmit}
    />
  );
};

EditBook.displayName = 'EditBook';

export default EditBook;
