import { createContext } from 'preact';

export const initialFilterState = {
  reader: 'all',
  type: 'all',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FilterContext = createContext({
  dispatch: (action: IFilterAction): void => {},
  state: initialFilterState,
});

interface IFilterState {
  readonly reader: string;
  readonly type: string;
}

interface IFilterAction {
  readonly payload: {
    readonly reader?: string;
    readonly type?: string;
  };
  readonly type: string;
}

export const filterReducer = (state: IFilterState, action: IFilterAction): IFilterState => {
  const { payload } = action;

  switch (action.type) {
    case 'reader':
      return {
        ...state,
        reader: payload.reader,
      };
    case 'type':
      return {
        ...state,
        type: payload.type,
      };
    default:
      return state;
  }
};
