import { fromJS } from 'immutable';
import { LOGIN, LOGIN_SUCCEEDED, LOGIN_FAILED } from '../actions';

const initialState = fromJS({
  loading: false
});

export default (state = initialState, action) => {
  switch(action.type) {
  case LOGIN:
    return state.set('loading', true);
  case LOGIN_SUCCEEDED:
    return state.set('loading', false);
  case LOGIN_FAILED:
    return state.set('loading', false);
  default:
    return state;
  }
}
