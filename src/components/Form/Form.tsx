import { h } from 'preact';
import { useContext, useState } from 'preact/hooks';

import Button from '~/components/Button/Button';

import { BookContext } from '~/context/bookContext';
import { getDateString } from '~/utils/dates';
import { submitData } from '~/utils/api';

import './Form.scss';

const toggleArrayValues = (arr: readonly string[], value: string): string[] => {
  if (arr.includes(value)) {
    return arr.filter(item => item !== value);
  } else {
    return [...arr, value];
  }
};

const Form = (): h.JSX.Element => {
  const [acquired, setAcquired] = useState('no');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState(getDateString());
  const [read, setRead] = useState([]);
  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);
  const [overlayText, setOverlayText] = useState('Saving..');

  const {
    dispatch,
    state: { readers },
  } = useContext(BookContext);

  const routeInput = (name: string, value: string): void => {
    switch (name) {
      case 'acquired':
        if (value === 'yes' || value === 'no') setAcquired(value);
        break;
      case 'author':
        setAuthor(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'read':
        setRead(toggleArrayValues(read, value));
        break;
      case 'title':
        setTitle(value);
        break;
      default:
        return;
    }
  };

  const resetOverlay = (msg: string): void => {
    setOverlayText(msg);
    setTimeout((): void => {
      setSaving(false);
      setOverlayText('Saving...');
    }, 1000);
  };

  const resetForm = (): void => {
    resetOverlay('Successfully Saved!');
    setAcquired('no');
    setAuthor('');
    setDate(getDateString());
    setRead([]);
    setTitle('');
  };

  const onSubmit = (e: Event): void => {
    setSaving(true);
    submitData({ book: { acquired, author, date, read, title } }, 'books')
      .then((data: IBooksResponse) => {
        if (data !== undefined) {
          dispatch({ type: 'UPDATE_BOOKS', payload: { books: data.books } });
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

    routeInput(name, value);
  };

  return (
    <form class="form" onSubmit={onSubmit}>
      {saving && <div class="form-overlay">{overlayText}</div>}
      <label class="form-label" for="title">
        Title:
        <input id="title" name="title" type="text" value={title} onInput={onInput} />
      </label>
      <label class="form-label" for="author">
        Author:
        <input id="author" name="author" type="text" value={author} onInput={onInput} />
      </label>
      <div class="form-meta-label">
        <span class="form-meta-label-text">Newly Acquired:</span>
        <div class="form-sub-label-container">
          <label class="form-sub-label" for="acquired-yes">
            Yes:
            <input
              checked={acquired === 'yes'}
              id="acquired-yes"
              name="acquired"
              type="radio"
              value="yes"
              onInput={onInput}
            />
          </label>
          <label class="form-sub-label" for="acquired-no">
            No:
            <input
              checked={acquired === 'no'}
              id="acquired-no"
              name="acquired"
              type="radio"
              value="no"
              onInput={onInput}
            />
          </label>
        </div>
      </div>
      {acquired === 'yes' && (
        <label class="form-label" for="date-acquired">
          Date Acquired:
          <input id="date-acquired" name="date" type="date" value={date} onInput={onInput} />
        </label>
      )}
      <div class="form-meta-label">
        <span class="form-meta-label-text">Read By:</span>
        <div class="form-sub-label-column">
          {readers.map(reader => (
            <label key={reader} class="form-sub-label" for={`reader-${reader}`}>
              <input
                checked={read.includes(reader)}
                id={`reader-${reader}`}
                name="read"
                type="checkbox"
                value={reader}
                onInput={onInput}
              />
              {reader}
            </label>
          ))}
        </div>
      </div>
      <Button classes="form-submit" color="light" label="Submit" type="submit" />
    </form>
  );
};

Form.displayName = 'Form';

export default Form;
