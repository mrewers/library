import { initialModalState, modalReducer } from '../modalContext';

const openState: IModalState = {
  id: '1234',
  open: true,
};

const expectedOpen = JSON.stringify(openState);
const expectedInitial = JSON.stringify(initialModalState);

describe('modalReducer', () => {
  it('opens the modal with the provided id when action type is "OPEN_MODAL"', () => {
    const action: IModalAction = {
      type: 'OPEN_MODAL',
      payload: {
        id: '1234',
      },
    };

    const updatedState = modalReducer(initialModalState, action);

    expect(JSON.stringify(updatedState)).toEqual(expectedOpen);
  });

  it('resets the modal state when the action is "CLOSE_MODAL"', () => {
    const action: IModalAction = {
      type: 'CLOSE_MODAL',
    };

    const updatedState = modalReducer(openState, action);

    expect(JSON.stringify(updatedState)).toEqual(expectedInitial);
  });
});
