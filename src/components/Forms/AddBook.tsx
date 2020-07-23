import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import BookBase from './BookBase';

import { BookContext } from '~/context/bookContext';
import { getDateString } from '~/utils/dates';
import { submitData } from '~/utils/api';
import { toggleArrayValues } from '~/utils/form-helpers';

import './Form.scss';

interface IFormProps {
  readonly label?: string;
}

const Form = ({ label }: IFormProps): h.JSX.Element => {
  const initialState: IBook = {
    acquired: 'no',
    author: '',
    date: getDateString(),
    read: [],
    title: '',
  };

  const [book, setBook] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const [overlayText, setOverlayText] = useState('Saving..');

  const { dispatch } = useContext(BookContext);

  const resetOverlay = (msg: string): void => {
    setOverlayText(msg);
    setTimeout((): void => {
      setSaving(false);
      setOverlayText('Saving...');
    }, 1000);
  };

  const resetForm = (): void => {
    resetOverlay('Successfully Saved!');
    setBook(initialState);
  };

  const onSubmit = (e: Event): void => {
    setSaving(true);
    submitData({ book }, 'books')
      .then((data: IBookResponse) => {
        if (data !== undefined) {
          dispatch({ type: 'ADD_BOOK', payload: { book: data.book } });
          resetForm();
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

  const onInput = ({ currentTarget }: TypeEventInput): void => {
    const { name, value } = currentTarget;

    setBook({
      ...book,
      [name]: name === 'read' ? toggleArrayValues(book.read, value) : value,
    });
  };

  return (
    <BookBase
      book={book}
      classes="form-add"
      label={label}
      overlayText={overlayText}
      saving={saving}
      onInput={onInput}
      onSubmit={onSubmit}
    />
  );
};

Form.displayName = 'Form';

export default Form;
