import { h } from 'preact';
import { useContext } from 'preact/hooks';

import { ModalContext } from '~/context/modalContext';

import s from './Modal.scss';

interface IModalProps {
  readonly children: h.JSX.Element;
}

const Modal = ({ children }: IModalProps): h.JSX.Element => {
  const {
    dispatch,
    state: { open },
  } = useContext(ModalContext);

  const closeModal = (): void => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  if (open) {
    return (
      <div class={s.container}>
        <button class={s.background} type="button" onClick={(): void => closeModal()} />
        <dialog class={s.content} open>
          <button class={s.close} type="button" onClick={(): void => closeModal()}>
            <i class={s['close-icon']} />
          </button>
          {children}
        </dialog>
      </div>
    );
  }

  return null;
};

Modal.displayName = 'Modal';

export default Modal;
