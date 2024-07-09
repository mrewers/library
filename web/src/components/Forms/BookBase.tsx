import { createEffect, createSignal, For, Show } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import TypeAhead from 'components/TypeAhead/TypeAhead';

import { useReaders } from 'context/ReaderProvider';
import { useAuthors } from 'context/AuthorProvider';

import { authorSuggestions } from 'utils/authors';
import { bookConstants } from 'utils/books';
import { titleCase } from 'utils/strings';

import type { Component, JSX } from 'solid-js';

import s from './Form.module.scss';

interface IBookBaseProps {
  readonly book: IBook;
  readonly classes?: string;
  readonly isModified: boolean;
  readonly label?: string;
  readonly loading?: boolean;
  readonly onAuthor: (ids: string[]) => void;
  readonly onCancel?: () => void;
  readonly onDelete?: (e: MouseEvent) => void;
  readonly onInput: (e: InputEvent) => void;
  readonly onRetire?: (e: MouseEvent) => void;
  readonly onSelect: (e: Event) => void;
  readonly onSubmit: (e: Event) => void;
  readonly overlayText?: string;
  readonly readonly?: boolean;
  readonly saving?: boolean;
}

const BookBase: Component<IBookBaseProps> = (props) => {
  const [authorList] = useAuthors();
  const [readerList] = useReaders();

  const [format, setFormat] = createSignal('print');

  createEffect(() => {
    if (props?.book?.format?.type) {
      setFormat(props.book.format.type);
    }
  });

  /**
   * In addition to updating form values, the format dropdown toggles the visibility of the
   * format sub-values, namely the cover type for print and the e-book platform for digital.
   * @param e A selection event.
   */
  const updateFormat = (e: Event) => {
    if (e.currentTarget === null) {
      return;
    }

    const { value } = e.currentTarget as HTMLSelectElement;

    setFormat( value );

    props.onSelect( e );
  }

  /**
   * Determine whether the form submit button is enabled.
   * @returns Whether or not to disable the submit button.
   */
  const disableSubmit = () => {
    if ( props.readonly || !props.isModified ) {
      return true;
    }

    return false;
  }

  /**
   * Disable form fields on retired books.
   * We can't just set the whole form to readonly because we want the 'Restore' button to be enabled.
   * @returns Whether or not to disable the form fields.
   */
  const disableFields = () => {
    if ( props.readonly || props.book.retired ) {
      return true;
    }

    return false;
  }

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
          readonly={disableFields()}
          type="text"
          value={props.book.title}
          onInput={props.onInput}
        />
      </label>
      <label class={s.label} for="type-ahead-author">
        Author(s):
        <TypeAhead
          disabled={disableFields()}
          name="author"
          placeholder="Begin typing to search for author..."
          selected={authorSuggestions.fromIds(props.book.author || [], authorList)}
          suggestions={authorSuggestions.fromAuthors(authorList)}
          onChange={props.onAuthor}
        />
      </label>
      <label class={s.label} for="date-acquired">
        Date Acquired:
        <input
          id="date-acquired"
          name="dateAcquired"
          readonly={disableFields()}
          type="date"
          value={props.book.dateAcquired}
          onInput={props.onInput}
        />
      </label>
      <label class={s.label} for="format-type">
        Format:
        <select
          id="format-type"
          name="format-type"
          disabled={disableFields()}
          value={props.book?.format?.type || 'print'}
          onChange={updateFormat}
        >
          <For each={bookConstants.BOOK_FORMATS}>{
              (format): JSX.Element => (
                <option value={format}>{titleCase(format)}</option>
              )
            }</For>
        </select>
      </label>
      <Show when={format() === 'print'}>
        <label class={s.label} for="format-cover">
          Cover:
          <select
            id="format-cover"
            name="format-cover"
            disabled={disableFields()}
            value={props.book?.format?.cover || 'paperback'}
            onChange={props.onSelect}
          >
            <For each={bookConstants.BOOK_COVER_TYPES}>{
              (cover): JSX.Element => (
                <option value={cover}>{titleCase(cover)}</option>
              )
            }</For>
          </select>
        </label>
      </Show>
      <Show when={format() === 'digital'}>
        <label class={s.label} for="format-platform">
          Platform:
          <select
            id="format-platform"
            name="format-platform"
            disabled={disableFields()}
            value={props.book?.format?.platform || 'kindle'}
            onChange={props.onSelect}
          >
            <For each={bookConstants.EBOOK_PLATFORMS}>{
              (platform): JSX.Element => (
                <option value={platform}>{titleCase(platform)}</option>
              )
            }</For>
          </select>
        </label>
      </Show>
      <div class={s['meta-label']}>
        <span class={s['meta-label-text']}>Read By:</span>
        <div class={s['sub-label-column']}>
          <For each={readerList}>{
            (reader): JSX.Element => (
              <label class={s['sub-label']} for={`reader-${reader.id}`}>
                <input
                  checked={props.book.readBy.includes(reader.id)}
                  disabled={disableFields()}
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
              disabled={disableFields()}
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
            disabled={disableSubmit()}
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
