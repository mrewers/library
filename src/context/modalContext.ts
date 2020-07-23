import { createContext } from 'preact';

export const initialModalState: IModalState = {
  id: null,
  open: false,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ModalContext = createContext({
  dispatch: (action: IModalAction): void => {
    console.log(action);
  },
  state: initialModalState,
});

interface IModalState {
  readonly id?: string | null;
  readonly open: boolean;
}

interface IModalAction {
  readonly payload?: {
    readonly id?: string | null;
  };
  readonly type: 'OPEN_MODAL' | 'CLOSE_MODAL';
}

export const modalReducer = (state: IModalState, action: IModalAction): IModalState => {
  const { payload } = action;

  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        id: payload.id,
        open: true,
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        id: null,
        open: false,
      };
    default:
      return state;
  }
};
