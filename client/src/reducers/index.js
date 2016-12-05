import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { fromJS } from 'immutable';

import auth from './auth'
import room from './room';
import messages from './messages';
import error from './error';
import rooms from './rooms';

const initialRouterReducerState = fromJS({});

const router = (state = initialRouterReducerState, action) => {
  switch (action.type) {
  case LOCATION_CHANGE:
    return state.merge({
      locationBeforeTransitions: action.payload,
    });

  default:
    return state;
  }
};

const createReducer = () => combineReducers({
  auth, room, messages, router, error, rooms
});

export default createReducer;
