import { For, Show } from 'solid-js';
import { createSignal } from 'solid-js';
import type { Component, JSX } from 'solid-js';

import Button from 'components/Button/Button';
import Overlay from 'components/Overlay/Overlay';
import { useReaders } from 'context/ReaderProvider';

import { buildQuery } from 'utils/api';

import s from './Form.module.scss';

interface IReadersProps {
  readonly loading?: boolean;
  readonly onCancel?: () => void;
  readonly onDelete?: (e: MouseEvent) => void;
}

const Readers: Component<IReadersProps> = (props) => {
  const [
    readerList,
    {
      addReader,
      createNewReader,
      getReader,
      updateReader,
    },
  ] = useReaders();

  const [changesMade, setChangesMade] = createSignal(false);
  const [reader, setReader] = createSignal(createNewReader());
  const [newReaders, setNewReaders] = createSignal([] as string[])

  const [saving, setSaving] = createSignal(false);
  const [overlayText, setOverlayText] = createSignal('');                

  /**
   * Handle user inputs in the reader form.
   * @param e An input event.
   * @param e.currentTarget The input element that is being interacted with.  
   */
  const onInput = ({ currentTarget }: InputEvent): void => {
    if (currentTarget === null) {
      return;
    }

    const { name, value, dataset } = currentTarget as HTMLInputElement

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

  const onSubmit = (e: Event): void => {
    e.preventDefault();

    setChangesMade(false)
    setReader(createNewReader())

    const added = [] as IReader[];

    newReaders().forEach( r => {
      const item = readerList.filter(i => i.id === r);

      added.push({...item[0], tempId: item[0].id});
    })

    buildQuery('readers', { readers: added }, 'POST');
  }

  return (
    <form class={s.form}>
      {props.loading && <Overlay text="Loading Reader Data..." />}
      {saving() && <Overlay text={overlayText() || 'Saving...'} />}
      <h3>Readers:</h3>
      <For each={readerList}>{
        (reader): JSX.Element => (
          <div>
            <label class={s.label} for="name">
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
            <label class={s.label} for="color">
              Color:
              <input
                data-id={reader.id}
                id="color"
                name="color"
                type="text"
                value={reader.color}
                onInput={onInput}
              />
            </label>
          </div>
        )
      }</For>
      <Show when={!changesMade()}>
        <Button
          classes={s.button}
          color="light"
          label="Add New Reader"
          type="button"
          onClick={onAddReader}
        />
      </Show>
      <Show when={changesMade()}>
        <Button
          classes={s.button}
          color="light"
          label="Save Reader"
          type="submit"
          onClick={onSubmit}
        />
      </Show>
    </form>
  );
};

export default Readers;
