import { For, Show } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import TypeAhead from 'components/TypeAhead/TypeAhead';

import { useReaders } from 'context/ReaderProvider';
import { useAuthors } from 'context/AuthorProvider';

import { authorSuggestions, getAuthorFullNames } from 'utils/authors';

import s from './Form.module.scss';

interface IBookBaseProps {
  readonly book: IBook;
  readonly classes?: string;
  readonly label?: string;
  readonly loading?: boolean;
  readonly onAuthor: (ids: string[]) => void;
  readonly onCancel?: () => void;
  readonly onDelete?: (e: MouseEvent) => void;
  readonly onInput: (e: InputEvent) => void;
  readonly onRetire?: (e: MouseEvent) => void;
  readonly onSubmit: (e: Event) => void;
  readonly overlayText?: string;
  readonly readonly?: boolean;
  readonly saving?: boolean;
}

const BookBase: Component<IBookBaseProps> = (props) => {
  const [authorList] = useAuthors();
  const [readerList] = useReaders();

  return (
    <form class={props.classes ? `${s.form} ${s[props.classes]}` : s.form}>
      <Show when={props.loading}>
        <Overlay text="Loading Book Data..." />
      </Show>
      <Show when={props.saving}>
        <Overlay text={props.overlayText || 'Saving...'} />
      </Show>
      <Show when={typeof props.label !== 'undefined'}>
        <h3 class={s.title}>{props.label}</h3>
      </Show>
      <label class={s.label} for="title">
        Title:
        <input
          id="title"
          name="title"
          readonly={props.readonly || false}
          type="text"
          value={props.book.title}
          onInput={props.onInput}
        />
      </label>
      <label class={s.label} for="type-ahead-author">
        Author(s):
        <TypeAhead
          name="author"
          selected={authorSuggestions.fromIds(props.book.author || [], authorList)}
          suggestions={authorSuggestions.fromAuthors(authorList)}
          onChange={props.onAuthor}
          disabled={props.readonly || false}
        />
      </label>
      <label class={s.label} for="date-acquired">
        Date Acquired:
        <input
          id="date-acquired"
          name="dateAcquired"
          readonly={props.readonly || false}
          type="date"
          value={props.book.dateAcquired}
          onInput={props.onInput}
        />
        </label>
      <div class={s['meta-label']}>
        <span class={s['meta-label-text']}>Read By:</span>
        <div class={s['sub-label-column']}>
          <For each={readerList}>{
            (reader): JSX.Element => (
              <label class={s['sub-label']} for={`reader-${reader.id}`}>
                <input
                  checked={props.book.readBy.includes(reader.id)}
                  disabled={props.readonly || false}
                  id={`reader-${reader.id}`}
                  name="readBy"
                  type="checkbox"
                  value={reader.id}
                  onInput={props.onInput}
                />
                {reader.name}
              </label>
            )
          }</For>
        </div>
      </div>
      <div class={s['button-container']}>
        <div class={s['button-group']}>
          <Show when={props.onDelete}>
            <Button
              classes={s.button}
              color="plain"
              disabled={props.readonly || false}
              label="Delete"
              type="button"
              onClick={props.onDelete}
            />
          </Show>
          <Show when={props.onRetire}>
            <Button
              classes={s.button}
              color="plain"
              disabled={props.readonly || false}
              label={props.book.retired ? 'Restore' : 'Jettison'}
              type="button"
              onClick={props.onRetire}
            />
          </Show>
        </div>
        <div class={s['button-group']}>
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
            disabled={props.readonly || false}
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
