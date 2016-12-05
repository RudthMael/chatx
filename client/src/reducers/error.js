import { fromJS } from 'immutable';

const initialState = fromJS({});

export default (state = initialState, action) => {
  if (/_FAILED$/.test(action.type)) {
    return state.set('message', action.error.message);
  }

  return state;
}
