import { createContext } from 'preact';

export const initialFilterState = {
  operator: 'or',
  reader: 'any',
  status: 'all',
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FilterContext = createContext({
  dispatch: (action: IFilterAction): void => {
    console.log(action);
  },
  state: initialFilterState,
});

declare global {
  interface IFilterState {
    readonly operator: string;
    readonly reader: string;
    readonly status: string;
  }

  interface IFilterAction {
    readonly payload: {
      readonly reader?: string;
      readonly status?: string;
    };
    readonly type: 'UPDATE_READER' | 'UPDATE_TYPE';
  }
}

const setOperator = (reader: string): string => (reader === 'all' ? 'and' : 'or');

export const filterReducer = (state: IFilterState, action: IFilterAction): IFilterState => {
  const { payload } = action;

  switch (action.type) {
    case 'UPDATE_READER':
      return {
        ...state,
        operator: setOperator(payload.reader),
        reader: payload.reader,
      };
    case 'UPDATE_TYPE':
      return {
        ...state,
        status: payload.status,
      };
    default:
      return state;
  }
};
