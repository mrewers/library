import { createEffect, createSignal, For, Show } from 'solid-js';
import type { Component } from 'solid-js';

import s from './TypeAhead.module.scss';

interface ISuggestion {
  id: string
  name: string
}

interface ITypeAheadProps {
  name: string
  onChange: (selected: string[]) => void
  suggestions: ISuggestion[]
  placeholder?: string
}

/**
 * A React component that renders a auto-completing input element.
 * 
 * Modelled after the ARIA Authoring Practices Guide suggestions for
 * creating an [accessible listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/).
 * 
 * @param props.name The value by which to reference this input.
 * @param props.onChange A function that passes user inputs to the parent.
 * @param props.suggestions The list of options for the type-ahead.
 * @param props.placeholder The optional sample text that should appear in the input field when empty.
 * @returns A JSX component.
 */
const TypeAhead: Component<ITypeAheadProps> = (props) => {
  // State to manage user input and selections.
  const [userInput, setUserInput] = createSignal('');
  const [selected, setSelected] = createSignal([] as ISuggestion[]);

  // State to manage the options in the suggestions dropdown.
  const [availableSuggestions, setAvailableSuggestions] = createSignal([] as ISuggestion[]);
  const [filteredSuggestions, setFilteredSuggestions] = createSignal([] as ISuggestion[]);

  // State to manage the UI.
  const [activeSuggestion, setActiveSuggestion] = createSignal(0);
  const [showSuggestions, setShowSuggestions] = createSignal(false);

  createEffect(() => setAvailableSuggestions(props.suggestions));

  /**
   * Hide the suggestions dropdown.
   */
  const resetSuggestions = () => {
    setActiveSuggestion(0);
    setShowSuggestions(false);
  }

  /**
   * Hide the suggestions dropdown and clear the user input.
   */
  const resetUI = () => {
    resetSuggestions();
    setUserInput('');
  }

  /**
   * Retrieved the select item based off of the id.
   * Add this item to the list of selected items and
   * remove it from the list of available suggestions.
   * @param id The unique id value for the selected item.
   */
  const selectSuggestion = (id: string) => {
    const choice = filteredSuggestions().find( s => s.id === id);

    if (choice) {
      setSelected([...selected(), choice]);
      setAvailableSuggestions(availableSuggestions().filter( sug => sug.id !== id));
      props.onChange(selected().map( sel => sel.id ));
    }
  }

  /**
   * Update the input field's value based on user inputs.
   * @param e A change event on the input field.
   */
  const handleInput = ({currentTarget}: Event ) => {
    const { value } = currentTarget as HTMLInputElement;

    const filtered = availableSuggestions().filter(
      sug => sug.name.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    setUserInput(value);
    setFilteredSuggestions(filtered);

    // Activate the suggestions dropdown.
    setActiveSuggestion(0);
    setShowSuggestions(true);
  }

  /**
   * Allow the user to navigate through the suggested options using their keyboard.
   * @param e A keydown event on the input field.
   */
  const handleKeyDown = (e: KeyboardEvent ) => {
    const { key } = e;

    // Ignore if there is no user input or it does not match any suggestion.
    if ( !userInput() || !showSuggestions()) {
      return;
    }

    // Move up down the suggestions list.
    if ( key === 'ArrowDown' ) {
      const newIndex = activeSuggestion() === filteredSuggestions().length
        ? 0 // If reached the end of list loop back to the top of the list.
        : activeSuggestion() + 1;

      setActiveSuggestion(newIndex);
    }

    // Move up the suggestions list.
    if ( key === 'ArrowUp' ) {
      const newIndex = activeSuggestion() === 0
        ? filteredSuggestions().length // If reached the first item, loop to the bottom of list.
        : activeSuggestion() - 1;

      setActiveSuggestion(newIndex)
    }

    // Navigate directly to the start of the suggestions list.
    if ( key === 'Home' ) {
      setActiveSuggestion(0);
    }

    // Navigate directly to the end of the suggestions list.
    if ( key === 'End' ) {
      setActiveSuggestion(filteredSuggestions().length);
    }

    // Select the highlighted suggestion.
    if ( key === 'Enter' ) {
      selectSuggestion(filteredSuggestions()[activeSuggestion()].id)
      resetUI();
    }

    // Disregard the current suggestions.
    if ( key === 'Escape' ) {
      resetSuggestions();
    }
  }

  /**
   * Allow the user to select one of the suggestions using their mouse.
   * @param e A click event on one of the suggested options.
   */
  const handleSuggestionClick = ({currentTarget}: MouseEvent) => {
    if (currentTarget === null) {
      return;
    }

    const { dataset } = currentTarget as HTMLLIElement;

    if ( dataset?.id ) {
      selectSuggestion(dataset.id);
      setFilteredSuggestions([]);
      resetUI();
    }
  }

  /**
   * Handles the removal of an item from the list of selections.
   * @param e An button click event.
   * @param e.currentTarget The button element that is being interacted with.  
   */
  const handlePillClick = ({currentTarget}: MouseEvent) => {
    if (currentTarget === null) {
      return;
    }

    const { dataset } = currentTarget as HTMLButtonElement;

    if ( dataset?.id ) {
      const item = selected().find( i => i.id === dataset.id );

      if ( item ) {
        setAvailableSuggestions([...availableSuggestions(), item]);
        setSelected(selected().filter( i => i.id !== dataset.id));
        props.onChange(selected().map( sel => sel.id ));
      }
    }
  }

  return (
    <div class={s.container}>
      <div class={s.pills}>
        <span>Selected:</span>
        <For each={selected()}>{
          (item) => (
            <button
              class={s.pill}
              data-id={item.id}
              type="button"
              onClick={handlePillClick}
            >
              {item.name}
            </button>
          )
        }</For>
      </div>
      <input
        autocomplete="off"
        class={s.input}
        id="type-ahead"
        name={props.name}
        placeholder={props.placeholder || ""}
        type="text"
        value={userInput()}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <div class={s.suggestions}>
        {/* Only show the suggestions if they exist and the user has entered some input. */}
        <Show when={showSuggestions() && userInput()}>
          <ul class={s.list} role='listbox'>
            { filteredSuggestions().map((item, idx) => (
              <li
                aria-selected={idx === activeSuggestion()}
                class={
                  idx === activeSuggestion()
                  ? `${s['list-option']} ${s.active}`
                  : `${s['list-option']}`
                }
                data-id={item.id}
                role='option'
                onClick={handleSuggestionClick}
              >
                {item.name}
              </li>
            ) ) }
            <li
              aria-selected={activeSuggestion() === filteredSuggestions().length}
              class={
                activeSuggestion() === filteredSuggestions().length
                ? `${s['list-option']} ${s.active}`
                : `${s['list-option']}`
              }
              data-name="add-new"
              role='option'
              onClick={handleSuggestionClick}
            >
              Add New
            </li>
          </ul>
        </Show>
      </div>
    </div>
  )
};

export default TypeAhead;