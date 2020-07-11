import { createContext } from 'preact';

export const initialFilterState = {
  operator: 'or',
  reader: 'any',
  type: 'all',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FilterContext = createContext({
  dispatch: (action: IFilterAction): void => {},
  state: initialFilterState,
});

interface IFilterState {
  readonly operator: string;
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

const setOperator = (reader: string): string => (reader === 'all' ? 'and' : 'or');

export const filterReducer = (state: IFilterState, action: IFilterAction): IFilterState => {
  const { payload } = action;

  switch (action.type) {
    case 'reader':
      return {
        ...state,
        operator: setOperator(payload.reader),
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
