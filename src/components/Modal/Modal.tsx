import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { ModalContext } from 'context/modalContext';
import s from './Modal.module.scss';

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
      <div className={s.container}>
        <button className={s.background} type="button" onClick={(): void => closeModal()} />
        <dialog className={s.content} open>
          <button className={s.close} type="button" onClick={(): void => closeModal()}>
            <i className={s['close-icon']} />
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
