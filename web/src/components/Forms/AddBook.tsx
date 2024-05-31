import type { Component } from 'solid-js';
import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

import BookBase from './BookBase';
import { useBooks } from 'context/BookProvider';
import { buildQuery } from 'utils/api';
import { handleFormInput } from 'utils/form-helpers';

interface IAddBookProps {
  readonly label?: string;
}

const AddBook: Component<IAddBookProps> = (props) => {
  const navigate = useNavigate();

  const [_, { addBook, createNewBook }] = useBooks();

  const [book, setBook] = createSignal(createNewBook());

  const [saving, setSaving] = createSignal(false);
  const [overlayText, setOverlayText] = createSignal('');

  // const resetOverlay = (msg: string): void => {
  //   setOverlayText(msg);
  //   setTimeout((): void => {
  //     setSaving(false);
  //     setOverlayText('Saving...');
  //   }, 1000);
  // };

  // const resetForm = (): void => {
  //   resetOverlay('Successfully Saved!');
  //   setBook(initialState);
  // };

  /**
   * Handle user inputs in the add book form.
   * @param e An input event.
   * @param e.currentTarget The input element that is being interacted with.
   */
  const onInput = ({ currentTarget }: InputEvent): void => {
    if (currentTarget === null) {
      return;
    }

    const [name, val] = handleFormInput(currentTarget as HTMLInputElement, book());

    setBook({
      ...book(),
      [name]: val,
    });
  };

  /**
   * Handles the selection/removal of an author using the author type-ahead component.
   * @param ids A list of author ids to be associated with the book.
   */
  const onAuthor = (ids: string[]): void => {
    setBook({
      ...book(),
      author: ids,
    });
  }

  /**
   * Handle the request to save form inputs.
   * @param e A button click event.
   */
  const onSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();

    setSaving(true);

    const { data } = await buildQuery('book', {...book()}, 'POST');

    setSaving(false);

    if ( data?.id ) {
      setBook({
        ...book(),
        id: data.id,
      });

      addBook(book());
      navigate(`/book/${data.id}`);
    }
  };

  /**
   * Stop adding a book and return to the home page.
   */
  const onCancel = () => {
    navigate('/');
  }

  return (
    <BookBase
      book={book()}
      classes="add"
      isModified={!!book().title}
      label={props.label}
      overlayText={overlayText()}
      saving={saving()}
      onAuthor={onAuthor}
      onCancel={onCancel}
      onInput={onInput}
      onSubmit={onSubmit}
    />
  );
};

export default AddBook;
