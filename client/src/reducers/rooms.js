import { fromJS } from 'immutable';
import { FETCH_ROOMS_SUCCEEDED } from '../actions';

const initialState = fromJS([]);

export default (state = initialState, action) => {
  switch (action.type) {

  case FETCH_ROOMS_SUCCEEDED:
    return fromJS(action.rooms);

  default:
    return state;
  }
}
