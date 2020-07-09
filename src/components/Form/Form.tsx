import { h } from 'preact';
import { useState } from 'preact/hooks';

const Form = () => {
  const [value, setValue] = useState('');

  const onSubmit = (e: Event) => {
    alert(value);
    e.preventDefault;
  };

  const onInput = (e: Event) => {
    const { value } = e.target;
    setValue(value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" value={value} onInput={onInput} />
      <p>You typed this value: {value}</p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
