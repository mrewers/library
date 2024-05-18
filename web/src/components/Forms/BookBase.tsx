import { For, Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import { useReaders } from 'context/ReaderProvider';

import s from './Form.module.scss';

interface IBookBaseProps {
  readonly book: IBook;
  readonly classes?: string;
  readonly label?: string;
  readonly loading?: boolean;
  readonly onCancel?: () => void;
  readonly onDelete?: (e: MouseEvent) => void;
  readonly onInput: (e: InputEvent) => void;
  readonly onRetire?: (e: MouseEvent) => void;
  readonly onSubmit: (e: Event) => void;
  readonly overlayText?: string;
  readonly readonly?: boolean;
  readonly saving?: boolean;
}

const BookBase: Component<IBookBaseProps> = ({
  book,
  classes,
  label,
  loading,
  onCancel,
  onDelete,
  onInput,
  onRetire,
  onSubmit,
  overlayText,
  readonly,
  saving,
}) => {
  const [readerList] = useReaders();

  // Const input: Ref<HTMLInputElement | null> = useRef(null);

  // const {
  //   state: { readers },
  // } = useContext(BookContext);

  // useEffect(() => {
  //   if (input !== null) {
  //     input.current.focus();
  //   }
  // }, [input]);

  return (
    <form class={classes ? `${s.form} ${s[classes]}` : s.form}>
      {loading && <Overlay text="Loading Book Data..." />}
      {saving && <Overlay text={overlayText || 'Saving...'} />}
      {typeof label !== 'undefined' && <h3 class={s.title}>{label}</h3>}
      <label class={s.label} for="title">
        Title:
        <input
          id="title"
          name="title"
          readonly={readonly || false}
          type="text"
          value={book.title}
          onInput={onInput}
        />
      </label>
      <label class={s.label} for="author">
        Author:
        <input
          id="author"
          name="author"
          readonly={readonly || false}
          type="text"
          value={book.author}
          onInput={onInput}
        />
      </label>
      <label class={s.label} for="date-acquired">
        Date Acquired:
        <input
          id="date-acquired"
          name="date"
          readonly={readonly || false}
          type="date"
          value={book.date}
          onInput={onInput}
        />
        </label>
      <div class={s['meta-label']}>
        <span class={s['meta-label-text']}>Read By:</span>
        <div class={s['sub-label-column']}>
          <For each={readerList}>{
            (reader): JSX.Element => (
              <label class={s['sub-label']} for={`reader-${reader}`}>
                <input
                  checked={book.read.includes(reader.name)}
                  disabled={readonly || false}
                  id={`reader-${reader}`}
                  name="read"
                  type="checkbox"
                  value={reader.name}
                  onInput={onInput}
                />
                {reader.name}
              </label>
            )
          }</For>
        </div>
      </div>
      <div class={s['button-container']}>
        <div class={s['button-group']}>
          <Show when={onDelete}>
            <Button
              classes={s.button}
              color="plain"
              disabled={readonly || false}
              label="Delete"
              type="button"
              onClick={onDelete}
            />
          </Show>
          <Show when={onRetire}>
            <Button
              classes={s.button}
              color="plain"
              disabled={readonly || false}
              label="Jettison"
              type="button"
              onClick={onRetire}
            />
          </Show>
        </div>
        <div class={s['button-group']}>
          <Show when={onCancel}>
            <Button
              classes={s.button}
              color="plain"
              label="Cancel"
              type="button"
              onClick={onCancel}
            />
          </Show>
          <Button
            classes={s.button}
            color="light"
            disabled={readonly || false}
            label="Submit"
            type="submit"
            onClick={onSubmit}
          />
        </div>
      </div>
    </form>
  );
};

export default BookBase;
