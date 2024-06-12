import { createSignal, Show } from 'solid-js';

import Button from 'components/Button/Button';
import SearchIcon from 'components/Icons/SearchIcon';
import XIcon from 'components/Icons/XIcon';

import { useFilters } from 'context/FilterProvider';

import { getColor } from 'utils/colors';

import type { Component } from 'solid-js';

import s from './SearchBar.module.scss';

/**
 * A form containing a search input allowing the user to submit a search term to the filter context.
 * @returns A SolidJS JSX component.
 */
const SearchBar: Component = () => {
  const [searchInput, setSearchInput] = createSignal('');

  const [_, { updateSearchFilter }] = useFilters();

  /**
   * Update the search bar's value based on user inputs.
   * @param e A change event on the input field.
   */
  const handleInput = ({currentTarget}: Event) => {
    const { value } = currentTarget as HTMLInputElement;

    setSearchInput( value );
  }

  /**
   * Reset the search bar to a blank value.
   */
  const handleClear = () => {
    setSearchInput( '' );
    updateSearchFilter( searchInput());
  }
  
  /**
   * Handle the request to submit a search query.
   * @param e A button click event.
   */
  const handleSubmit = (e: Event) => {
    e.preventDefault();

    updateSearchFilter( searchInput());
  }

  return (
    <div class={s.container}>
      <form onSubmit={handleSubmit}>
        <label class={s.label} for="search">
          <SearchIcon color={getColor("dark")} title="Search"/>
        </label>
        <input
          class={s.input}
          id="search"
          placeholder="Search books"
          type="search"
          value={searchInput()}
          onInput={handleInput}
        />
        <button
          class={s.clear}
          disabled={searchInput() === ""}
          id="clear-search"
          type="button"
          onClick={handleClear}
        >
          <Show when={searchInput() !== ""}>
            <XIcon title="Clear Search"/>
          </Show>
        </button>
        <Button
          classes={s.btn}
          color="white"
          disabled={searchInput() === ""}
          label="Search"
          type="submit"
        />
      </form>
    </div>
  )
};

export default SearchBar;