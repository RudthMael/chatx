import { takeLatest } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import * as Api from '../services/api';
import { LOGIN, loginSucceeded, loginFailed } from '../actions';
import { push } from 'react-router-redux';

function *login(action) {
  try {
    const data = yield call(Api.login, action.username, action.password);

    yield put(loginSucceeded(data.token));
    yield put(push(`/rooms`));
  } catch (error) {
    console.error('Error when logging in:', error); // eslint-disable-line no-console
    yield put(loginFailed(error));
  }
}

export default function* rootSaga() {
  yield [
    yield* takeLatest(LOGIN, login)
  ];
}
