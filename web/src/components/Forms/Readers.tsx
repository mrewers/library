import { For, Show } from 'solid-js';
import { createSignal } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import { useReaders } from 'context/ReaderProvider';

import { buildQuery } from 'utils/api';
import { getDefaultColors } from 'utils/colors';

import s from './Form.module.scss';

const Readers: Component = () => {
  const [
    readerList,
    {
      addReader,
      createNewReader,
      deleteReader,
      getReader,
      isReadersLoading,
      updateReader,
    },
  ] = useReaders();

  const [changesMade, setChangesMade] = createSignal(false);
  const [reader, setReader] = createSignal(createNewReader());
  const [newReaders, setNewReaders] = createSignal([] as string[])
  const [modifiedReaders, setModifiedReaders] = createSignal([] as string[])

  const [saving, setSaving] = createSignal(false);

  /**
   * Handle user inputs in the reader form.
   * @param e An input event.
   * @param e.currentTarget The input element that is being interacted with.  
   */
  const onInput = ({ currentTarget }: InputEvent): void => {
    if (currentTarget === null) {
      return;
    }

    const { name, value, dataset } = currentTarget as HTMLInputElement;

    if (dataset?.id) {
      const r = getReader(dataset.id)

      setReader({
        ...r,
        [name]: value,
      });

      updateReader(dataset.id, reader());
    }
  };

  /**
   * Handle the request to create a new reader entry.
   * @param e A button click event.
   */
  const onAddReader = (e: Event): void => {
    e.preventDefault();
    
    setReader(createNewReader());
    addReader(reader());

    setNewReaders([...newReaders(), reader().id]);
    setChangesMade(true);
  }

  /**
   * Handles the request to delete an existing reader entry.
   * @param e A button click event.
   */
  const onDelete = async (e: Event): Promise<void> => {
    e.preventDefault();

    if (e.currentTarget === null) {
      return;
    }

    const { dataset } = e.currentTarget as HTMLButtonElement;

    if (dataset?.id) {
      // If deleting newly added reader remove the id from the list of new readers.
      if ( newReaders().includes(dataset.id) ) {
        setNewReaders( newReaders().filter( i => i !== dataset.id ) );
      } else {
        await buildQuery('readers', {}, 'DELETE');
      }

      deleteReader(dataset.id);
    }
  }

  /**
   * Send the data for multiple new readers to the API to be saved.
   */
  const bulkReaderAdd = async () => {
    const added = [] as IReader[];

    // Iterate over the list of new reader ids, pulling the data for each.
    newReaders().forEach( r => {
      const item = readerList.filter(i => i.id === r);

      added.push({...item[0], tempId: item[0].id});
    })

    // Send the new reader data to the API for saving.
    const { data } = await buildQuery('readers', { readers: added }, 'POST');

    // Update the local state with the reader ids generated by Firestore.
    data.forEach((item: { readonly id: string, readonly tmp: string }) => {
      if (item?.id && item?.tmp) {
        const reader = { ...getReader(item.tmp), id: item.id };

        updateReader( item.tmp, reader );
      }
    } );
  }

  /**
   * Handle the request to save form inputs.
   * @param e A button click event.
   */
  const onSubmit = async (e: Event): Promise<void> => {
    e.preventDefault();

    // Activate saving overlay.
    setSaving(true);

    // Save newly added readers.
    if ( newReaders().length > 0 ) {
      await bulkReaderAdd();

      setNewReaders([]);
    }

    // Save modifications to existing readers.
    if ( modifiedReaders().length > 0 ) {
      setModifiedReaders([]);
    }

    // Reset the UI and form data.
    setSaving(false);
    setChangesMade(false);
    setReader(createNewReader());
  }

  return (
    <form class={s.form} style="min-height: 350px;">
      {isReadersLoading() && <Overlay text="Loading Reader Data..." />}
      {saving() && <Overlay text="Saving..." />}
      <h3 class={s.title}>Readers</h3>
      <div class={s.grid}>
        <For each={readerList}>{
          (reader, idx): JSX.Element => (
            <div>
              <label class={`${s.label} ${s.condensed}`} for="name">
                Name:
                <input
                  data-id={reader.id}
                  id="name"
                  name="name"
                  type="text"
                  value={reader.name}
                  onInput={onInput}
                />
              </label>
              <label class={`${s.label} ${s.condensed}`} for="color">
                Color:
                <input
                  data-id={reader.id}
                  id="color"
                  name="color"
                  style="padding: 0;"
                  type="color"
                  value={getDefaultColors(idx())}
                  onInput={onInput}
                />
              </label>
              <Button
                color="light"
                data={[{name: 'id', value: reader.id}]}
                label="Delete Reader"
                type="button"
                onClick={onDelete}
              />
            </div>
          )
        }</For>
      </div>
      <div class={s['bottom-bar']}>
        <Button
          classes={s.button}
          color="dark"
          label="Add New Reader"
          type="button"
          onClick={onAddReader}
        />
        <Button
          classes={s.button}
          color="dark"
          label="Save Changes"
          type="submit"
          onClick={onSubmit}
        />
      </div>
    </form>
  );
};

export default Readers;
