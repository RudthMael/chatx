import { fromJS } from 'immutable';
import { LOGIN, LOGIN_SUCCEEDED, LOGIN_FAILED } from '../actions';

const LOCAL_STORAGE_TOKEN_KEY = 'chatx__token';
const initialState = fromJS({
  loading: false,
  token: localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
});

export default (state = initialState, action) => {
  switch(action.type) {
  case LOGIN:
    return state.set('loading', true);

  case LOGIN_SUCCEEDED:
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.token)
    return state.set('token', action.token);

  case LOGIN_FAILED:
    return state.set('loading', false);

  default:
    return state;
  }
}
