import { For, Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import { BookContext } from 'context/bookContext';
import s from './Form.module.scss';
import { useReaders } from 'context/ReaderProvider';

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
  readonly saving?: boolean;
}

const BookBase: Component<IBookBaseProps> = (props) => {
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
    <form class={props.classes ? `${s.form} ${s[props.classes]}` : s.form}>
      {props.loading && <Overlay text="Loading Book Data..." />}
      {props.saving && <Overlay text={props.overlayText || 'Saving...'} />}
      {typeof props.label !== 'undefined' && <h3 class={s.title}>{props.label}</h3>}
      <label class={s.label} for="title">
        Title:
        <input id="title" name="title" type="text" value={props.book.title} onInput={props.onInput} />
      </label>
      <label class={s.label} for="author">
        Author:
        <input id="author" name="author" type="text" value={props.book.author} onInput={props.onInput} />
      </label>
      <div class={s['meta-label']}>
        <span class={s['meta-label-text']}>Newly Acquired:</span>
        <div class={s['sub-label-container']}>
          <label class={s['sub-label']} for="acquired-yes">
            Yes:
            <input
              checked={props.book.acquired === true}
              id="acquired-yes"
              name="acquired"
              type="radio"
              value="yes"
              onInput={props.onInput}
            />
          </label>
          <label class={s['sub-label']} for="acquired-no">
            No:
            <input
              checked={props.book.acquired === false}
              id="acquired-no"
              name="acquired"
              type="radio"
              value="no"
              onInput={props.onInput}
            />
          </label>
        </div>
      </div>
      <Show when={props.book.acquired === true}>{
        <label class={s.label} for="date-acquired">
          Date Acquired:
          <input
            id="date-acquired"
            name="date"
            type="date"
            value={props.book.date}
            onInput={props.onInput}
          />
        </label>
      }</Show>
      <div class={s['meta-label']}>
        <span class={s['meta-label-text']}>Read By:</span>
        <div class={s['sub-label-column']}>
          <For each={readerList}>{
            (reader): JSX.Element => (
              <label class={s['sub-label']} for={`reader-${reader}`}>
                <input
                  checked={props.book.read.includes(reader.name)}
                  id={`reader-${reader}`}
                  name="read"
                  type="checkbox"
                  value={reader.name}
                  onInput={props.onInput}
                />
                {reader.name}
              </label>
            )
          }</For>
        </div>
      </div>
      <div class={s['button-container']}>
        <div>
          <Show when={props.onDelete}>
            <Button
              classes={s.button}
              color="plain"
              label="Delete"
              type="button"
              onClick={props.onDelete}
            />
          </Show>
          <Show when={props.onRetire}>
            <Button
              classes={s.button}
              color="plain"
              label="Jettison"
              type="button"
              onClick={props.onRetire}
            />
          </Show>
        </div>
        <div>
          <Show when={props.onCancel}>
            <Button
              classes={s.button}
              color="plain"
              label="Cancel"
              type="button"
              onClick={props.onCancel}
            />
          </Show>
          <Button
            classes={s.button}
            color="light"
            label="Submit"
            type="submit"
            onClick={props.onSubmit}
          />
        </div>
      </div>
    </form>
  );
};

export default BookBase;
