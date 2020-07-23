import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import BookBase from './BookBase';

import { fetchData, updateItem } from '~/utils/api';
import { getDateString } from '~/utils/dates';
import { toggleArrayValues } from '~/utils/form-helpers';
import { BookContext } from '~/context/bookContext';
import { ModalContext } from '~/context/modalContext';

import './Form.scss';

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

  const resetOverlay = (msg: string): void => {
    setOverlayText(msg);
    setTimeout((): void => {
      setSaving(false);
      setOverlayText('Saving...');
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
      label={label}
      loading={loading}
      overlayText={overlayText}
      saving={saving}
      onCancel={closeModal}
      onInput={onInput}
      onSubmit={onSubmit}
    />
  );
};

EditBook.displayName = 'EditBook';

export default EditBook;
