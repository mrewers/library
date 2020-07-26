import { h } from 'preact';
import { Ref, useContext, useEffect, useRef } from 'preact/hooks';

import Button from '~/components/Button/Button';
import Overlay from '~/components/Overlay/Overlay';

import { BookContext } from '~/context/bookContext';

interface IBookBaseProps {
  readonly book: {
    readonly acquired: 'yes' | 'no';
    readonly author?: string;
    readonly date?: string;
    readonly read?: readonly string[];
    readonly title?: string;
  };
  readonly classes?: string;
  readonly hasCancel?: boolean;
  readonly hasDelete?: boolean;
  readonly hasRetire?: boolean;
  readonly label?: string;
  readonly loading?: boolean;
  readonly onCancel?: () => void;
  readonly onDelete?: (e: TypeEventInput) => void;
  readonly onInput: (e: TypeEventInput) => void;
  readonly onRetire?: (e: TypeEventInput) => void;
  readonly onSubmit: (e: Event) => void;
  readonly overlayText?: string;
  readonly saving?: boolean;
}

const BookBase = ({
  book,
  classes,
  hasCancel,
  hasDelete,
  hasRetire,
  label,
  loading,
  onCancel,
  onDelete,
  onInput,
  onRetire,
  onSubmit,
  overlayText,
  saving,
}: IBookBaseProps): h.JSX.Element => {
  const { acquired, author, date, read, title } = book;
  const input: Ref<null | HTMLInputElement> = useRef(null);

  const {
    state: { readers },
  } = useContext(BookContext);

  useEffect(() => {
    if (input !== null) {
      input.current.focus();
    }
  }, [input]);

  return (
    <form class={classes ? `form ${classes}` : 'form'} onSubmit={onSubmit}>
      {loading && <Overlay text="Loading Book Data..." />}
      {saving && <Overlay text={overlayText} />}
      {label && <h3 class="form-title">{label}</h3>}
      <label class="form-label" for="title">
        Title:
        <input ref={input} id="title" name="title" type="text" value={title} onInput={onInput} />
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
      <div class="form-button-container">
        <div>
          {hasDelete && (
            <Button
              classes="form-button"
              color="plain"
              label="Delete"
              type="button"
              onClick={onDelete}
            />
          )}
          {hasRetire && (
            <Button
              classes="form-button"
              color="plain"
              label="Jettison"
              type="button"
              onClick={onRetire}
            />
          )}
        </div>
        <div>
          {hasCancel && (
            <Button
              classes="form-button"
              color="plain"
              label="Cancel"
              type="button"
              onClick={onCancel}
            />
          )}
          <Button classes="form-button" color="light" label="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
};

BookBase.displayName = 'BookBase';

export default BookBase;
