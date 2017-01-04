import { List, fromJS } from 'immutable';
import { FETCH_ROOM_SUCCEEDED, JOIN_ROOM_SUCCEEDED } from '../actions';

const initialState = fromJS({ users: List(), messages: List() });

export default (state = initialState, action) => {
  switch (action.type) {

  case JOIN_ROOM_SUCCEEDED:
  case FETCH_ROOM_SUCCEEDED:
    return fromJS(Object.assign(action.room, { messages: List() }));

  default:
    return state;
  }
}
