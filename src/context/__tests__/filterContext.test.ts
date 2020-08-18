import { initialFilterState, filterReducer } from '../filterContext';

const updatedReaderState: IFilterState = {
  operator: 'and',
  reader: 'all',
  status: 'all',
};

const updatedStatusState: IFilterState = {
  operator: 'or',
  reader: 'any',
  status: 'read',
};

const expectedReader = JSON.stringify(updatedReaderState);
const expectedStatus = JSON.stringify(updatedStatusState);
const expectedInitial = JSON.stringify(initialFilterState);

describe('filterReducer', () => {
  it('updates the reader and operator when the action is "UPDATE_READER"', () => {
    const action: IFilterAction = {
      type: 'UPDATE_READER',
      payload: {
        reader: 'all',
      },
    };

    const updatedState = filterReducer(initialFilterState, action);

    expect(JSON.stringify(updatedState)).toEqual(expectedReader);

    const resetAction: IFilterAction = {
      type: 'UPDATE_READER',
      payload: {
        reader: 'any',
      },
    };

    const resetState = filterReducer(updatedReaderState, resetAction);

    expect(JSON.stringify(resetState)).toEqual(expectedInitial);
  });

  it('updates the status property when the action is "UPDATE_TYPE"', () => {
    const action: IFilterAction = {
      type: 'UPDATE_TYPE',
      payload: {
        status: 'read',
      },
    };

    const updatedState = filterReducer(initialFilterState, action);

    expect(JSON.stringify(updatedState)).toEqual(expectedStatus);
  });
});
