import { Show } from 'solid-js';
import { createEffect, createSignal } from 'solid-js';
import type { Component } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import { useAuthors } from 'context/AuthorProvider';

import { buildQuery } from 'utils/api';
import { constructFullName } from 'utils/authors';

import s from './Form.module.scss';

interface IAuthorProps {
  readonly input?: string;
  readonly onClose: () => void;
  readonly onSave: (author: ITypeAheadSuggestion) => void;
}

const Author: Component<IAuthorProps> = (props) => { 
  const [input, setInput] = createSignal({} as {nameFirst: string, nameLast: string});
  const [saving, setSaving] = createSignal(false);
  const [error, setError] = createSignal(false);

  const [_, { addAuthor }] = useAuthors();

  /**
   * Populate the author form with the initial values input by the user.
   * Assumes that the first space in the user input (if it exists) is
   * the delimiter between the author's first and last names.
   */
  createEffect(() => {
    if (props.input) {
      const [first, ...rest] = props.input.split(' ');
      const last = rest.join(' ');

      setInput({ nameFirst: first, nameLast: last });
    }
  });

  /**
   * Resets the form to it's initial state and executes any action passed in from the parent.
   */
  const closeForm = () => {
    setError(false);
    setInput( { nameFirst: "", nameLast: "" } );
    props.onClose();
  }

  /**
   * Update the form's field values based on user inputs.
   * @param e A change event on the input field.
   */
  const handleInput = ({currentTarget}: Event) => {
    const { name, value } = currentTarget as HTMLInputElement;

    setInput( {...input(), [name]: value } );
  }

  /**
   * Executes a POST request to save the newly added author in the database.
   * Following a successful save, it updates the author's list in context
   * with the newly added author.
   */
  const saveAuthor = async () => {
    setSaving(true);

    const { data } = await buildQuery( 'author', input(), 'POST' );

    setSaving(false);

    if ( data?.id ) {
      const nameFull = constructFullName( input().nameFirst, input().nameLast );

      const author = {
        id: data.id,
        name: nameFull
      }

      addAuthor({...input(), id: data.id, nameFull});

      props.onSave(author)

      closeForm();
    } else {
      setError(true);
    }
  }

  return (
    <form class={s['nested-form']}>
      <Show when={saving()}>
        <Overlay nested text="Saving..." />
      </Show>
      <div class={s['nested-content']}>
        <label>
          First Name:
          <input autofocus 
            name="nameFirst"
            type="text"
            value={input().nameFirst}
            onInput={handleInput}
          />
        </label>
        <label>
          Last Name:
          <input 
            name="nameLast"
            type="text"
            value={input().nameLast}
            onInput={handleInput}
          />
        </label>
      </div>
      <Show when={error()}>
        <span>Something went wrong, failed to save.</span>
      </Show>
      <div class={s['nested-controls']}>
        <Button
          label="Add Author"
          disabled={input().nameFirst === '' && input().nameLast === ''}
          onClick={saveAuthor}
        />
        <Button
          label="Cancel"
          color="plain"
          onClick={closeForm}
        />
      </div>
    </form>
  );
};

export default Author;
