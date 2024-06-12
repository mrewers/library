import { createSignal } from 'solid-js';

import Button from 'components/Button/Button';
import SearchIcon from 'components/Icons/SearchIcon';

import { useFilters } from 'context/FilterProvider';

import type { Component } from 'solid-js';

import s from './SearchBar.module.scss';

const SearchBar: Component = () => {
  const [searchInput, setSearchInput] = createSignal("");

  const [_, { updateSearchFilter }] = useFilters();

  /**
   * Update the search bar's value based on user inputs.
   * @param e A change event on the input field.
   */
  const handleInput = ({currentTarget}: Event) => {
    const { value } = currentTarget as HTMLInputElement;

    setSearchInput( value );
  }
  
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    updateSearchFilter( searchInput());
  }

  return (
    <div class={s.container}>
      <form onSubmit={handleSubmit}>
        <label class={s.label} for="search">
          <SearchIcon title="Search"/>
        </label>
        <input
          class={s.input}
          id="search"
          placeholder="Search books"
          type="search"
          value={searchInput()}
          onChange={handleInput}
        />
        <Button
          classes={s.btn}
          color="white"
          label="Search"
          type="submit"
        />
      </form>
    </div>
  )
};

export default SearchBar;