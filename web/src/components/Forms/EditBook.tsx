import type { Component } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import BookBase from './BookBase';

import { useAuthors } from 'context/AuthorProvider';
import { useBooks } from 'context/BookProvider';

import { buildQuery } from 'utils/api';
import { handleFormInput, handleFormSelect } from 'utils/form-helpers';

interface IEditBookProps {
  readonly id: string;
  readonly label?: string;
  readonly readonly?: boolean;
}

const EditBook: Component<IEditBookProps> = (props) => {
  const navigate = useNavigate();
  
  const [overlayText, setOverlayText] = createSignal('Saving..');
  const [saving, setSaving] = createSignal(false);

  const [
    _,
    {
      getBook,
      initialBookState,
      isBooksLoading,
      removeBook,
      updateBook
    }
  ] = useBooks();
  const [__, {updateAuthorBooks}] = useAuthors();

  // Initialize the book form with blank data.
  const [book, setBook] = createSignal(initialBookState());
  const [initialAuthors, setInitialAuthors] = createSignal([] as string[]);
  const [modifiedFields, setModifiedFields] = createSignal([] as string[]);

  createEffect(() => {
    // Replace the initial book placeholder with data from the API.
    const setBookData = async () => {
      const initial = await getBook(props.id);

      setBook(initial);
      setInitialAuthors(initial.author || []);
    }

    setBookData();
  });

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
   * Keep track of which fields have been updated.
   * @param fieldName The name of the field that has been updated.
   */
  const trackModified = (fieldName: string) => {
    if (!modifiedFields().includes(fieldName)) {
      setModifiedFields([...modifiedFields(), fieldName]);
    }
  }

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

    trackModified(name);

    setBook({
      ...book(),
      [name]: val,
    });
  };

  /**
   * Handle user selections in the edit book form.
   * @param e A selection event.
   * @param e.currentTarget The select element that is being interacted with.
   */
  const onSelect = ({ currentTarget }: Event): void => {
    if (currentTarget === null) {
      return;
    }

    const {field, val} = handleFormSelect(currentTarget as HTMLSelectElement, book());

    if ( val === undefined ) {
      return;
    }

    trackModified(field);

    setBook({
      ...book(),
      [field]: val,
    });
  }

  /**
   * Handles the selection/removal of an author using the author type-ahead component.
   * @param ids A list of author ids to be associated with the book.
   */
  const onAuthor = (ids: string[]): void => {
    trackModified('author');

    setBook({
      ...book(),
      author: ids,
    });
  }

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
   * Identify the authors that have been added to/removed from
   * the book and update their respective list of books.
   */
  const updateAuthorAssociation = async () => {
    const authors = book().author || [];
    const initial = initialAuthors() || [];

    const added = initial.length > 0
      ? authors.filter(a => !initial.includes(a))
      : authors;

    const removed = initial.length > 0
      ? initial.filter(a => !authors.includes(a))
      : initial;

    const merged = [...added, ...removed];

    merged?.forEach( async a => {
      await updateAuthorBooks(a, props.id);
    });
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

      if ( modifiedFields().includes('author') ) {
        await updateAuthorAssociation();
      }

      setSaving(false);
      setModifiedFields([]);
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

    setSaving(false);
    navigate(retired ? '/retired' : '/');
  };

  /**
   * Handle the request to delete a book entirely.
   * @param e A button click event.
   */
  const onDelete = async (): Promise<void> => {
    setSaving(true);

    await buildQuery(`book?id=${props.id}`, null, 'DELETE');

    await updateAuthorAssociation();
    removeBook(props.id);

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
      isModified={modifiedFields().length > 0}
      onAuthor={onAuthor}
      onCancel={onCancel}
      onDelete={onDelete}
      onInput={onInput}
      onRetire={onRetire}
      onSelect={onSelect}
      onSubmit={onSubmit}
      overlayText={overlayText()}
      readonly={props.readonly}
      loading={isBooksLoading()}
      saving={saving()}
    />
  );
};

export default EditBook;
