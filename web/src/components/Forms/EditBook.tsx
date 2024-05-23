import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import BookBase from './BookBase';
import { buildQuery } from 'utils/api';
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
  const [modifiedFields, setModifiedFields] = createSignal([] as string[])

  // const resetOverlay = (msg: string, close = false): void => {
  //   setOverlayText(msg);
  //   setTimeout((): void => {
  //     setSaving(false);
  //     setOverlayText('Saving...');
  //     // if (close) {
  //     //   dispatch({ type: 'CLOSE_MODAL' });
  //     // }
  //   }, 1000);
  // };

  /**
   * Handle user inputs in the edit book form.
   * @param e An input event.
   * @param e.currentTarget The input element that is being interacted with.
   */
  const onInput = ({ currentTarget }: InputEvent): void => {
    if (currentTarget === null) {
      return;
    }

    const [name, val] = handleFormInput(currentTarget as HTMLInputElement, book());

    // Keep track of which fields have been updated.
    if (!modifiedFields().includes(name)) {
      setModifiedFields([...modifiedFields(), name])
    }

    setBook({
      ...book(),
      [name]: val,
    });
  };

  /**
   * Retrieve the values for all the fields that have been updated.
   * @returns An object with all the updated values.
   */
  const getUpdates = (): {[key: string]: any} => {
    const updates = {} as {[key: string]: any};

    modifiedFields().forEach(f => updates[f] = book()[f as keyof IBook]);

    return updates;
  }

  /**
   * Handle the request to save form inputs.
   * @param e A button click event.
   */
  const onSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();

    if (modifiedFields().length > 0 ) {
      setSaving(true);

      await buildQuery(`book?id=${props.id}`, getUpdates(), 'PATCH');

      updateBook(props.id, book());

      setSaving(false);
    }
  };

  /**
   * Handle the request to retire a book.
   * Saves any pending changes as well as retiring the book.
   * @param e A button click event.
   */
  const onRetire = async (): Promise<void> => {
    setSaving(true);

    const retired = !book().retired;
    const update = {...book(), retired };

    if (retired) {
      update.dateRetired = (new Date).toJSON();
      setModifiedFields([...modifiedFields(), 'dateRetired', 'retired']);
    } else {
      update.dateRestored = (new Date).toJSON();
      setModifiedFields([...modifiedFields(), 'dateRestored', 'retired']);
    }

    setBook(update);
    updateBook(props.id, update);

    await buildQuery(`book?id=${props.id}`, getUpdates(), 'PATCH');

  //   resetOverlay('Successfully Jettisoned!', true);

    setSaving(true);
    navigate(retired ? '/retired' : '/');
  };

  /**
   * Handle the request to delete a book entirely.
   * @param e A button click event.
   */
  const onDelete = async (): Promise<void> => {
    setSaving(true);

    // await buildQuery(`book?id=${props.id}`, null, 'DELETE');

    removeBook(props.id)

    // resetOverlay('Successfully Deleted!', true);
    setSaving(false);

    navigate('/');
  };

  /**
   * Stop editing the book and return to the home page.
   */
  const onCancel = () => {
    navigate('/');
  }

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
