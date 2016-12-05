import { fromJS } from 'immutable';
import { SEND_MESSAGE } from '../actions';

const initialState = fromJS([ 'Hi, how are you doing?' ]);

export default (state = initialState, action) => {
  switch (action.type) {
  case SEND_MESSAGE:
    return state.push(action.message);

  default:
    return state;
  }
}
