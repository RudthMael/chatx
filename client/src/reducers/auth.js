import { fromJS } from 'immutable';
import { LOGIN, LOGIN_SUCCEEDED, LOGIN_FAILED } from '../actions';
import { REGISTER, REGISTER_SUCCEEDED, REGISTER_FAILED } from '../actions';

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
    return state.withMutations(s => s.set('token', action.token).set('loading', false));

  case LOGIN_FAILED:
    return state.set('loading', false);

  case REGISTER:
    return state.set('loading', true);

  case REGISTER_SUCCEEDED:
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, action.data.token);
    return state.withMutations(s => s
      .set('currentUser', fromJS({
        name: action.data.name,
        username: action.data.username
      }))
      .set('token', action.data.token)
      .set('loading', false)
    );

  case REGISTER_FAILED:
    return state.set('loading', false);

  default:
    return state;
  }
}
