import { h } from 'preact';
import { useState } from 'preact/hooks';

import Button from '../Button/Button';

import './Form.scss';

const Form = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const routeInput = (name: string, value: string) => {
    switch (name) {
      case 'author':
        setAuthor(value);
        break;
      case 'title':
        setTitle(value);
        break;
      default:
        return;
    }
  };

  const onSubmit = (e: Event) => {
    alert(title);
    e.preventDefault();
  };

  const onInput = (e: Event) => {
    const { name, value } = e.target;
    console.log(name, value);

    routeInput(name, value);
  };

  return (
    <form class="form" onSubmit={onSubmit}>
      <label class="form-label" for="title">
        Title:
        <input id="title" name="title" type="text" value={title} onInput={onInput} />
      </label>
      <label class="form-label" for="author">
        Author:
        <input id="author" name="author" type="text" value={author} onInput={onInput} />
      </label>
      <Button classes="form-submit" color="accent" label="Submit" type="submit" />
    </form>
  );
};

Form.displayName = 'Form';

export default Form;
