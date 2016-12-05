import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import * as Api from '../services/api';
import { FETCH_ROOMS, fetchRoomsSucceeded, fetchRoomsFailed } from '../actions';
import { getAuth } from '../selectors';

function *fetchRooms() {
  try {
    const auth = yield select(getAuth);
    const data = yield call(Api.fetchRooms, auth.get('token'));

    yield put(fetchRoomsSucceeded(data));
  } catch (error) {
    console.error('Error when fetching rooms:', error); // eslint-disable-line no-console
    yield put(fetchRoomsFailed(error));
  }
}

export default function* rootSaga() {
  yield [
    yield* takeLatest(FETCH_ROOMS, fetchRooms)
  ];
}
