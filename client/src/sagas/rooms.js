import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import * as Api from '../services/api';
import {
  FETCH_ROOMS, fetchRoomsSucceeded, fetchRoomsFailed,
  FETCH_ROOM, fetchRoomSucceeded, fetchRoomFailed
} from '../actions';
import { getAuth } from '../selectors';

/**
 * Fetch rooms accessible by the user
 * @yield {Object}
 */
function* fetchRooms() {
  try {
    const auth = yield select(getAuth);
    const data = yield call(Api.fetchRooms, auth.get('token'));

    yield put(fetchRoomsSucceeded(data));
  } catch (error) {
    console.error('Error when fetching rooms:', error); // eslint-disable-line no-console
    yield put(fetchRoomsFailed(error));
  }
}

/**
 * Fetch room
 * @yield {Object}
 */
function* fetchRoom({ roomId }) {
  try {
    const auth = yield select(getAuth);
    const data = yield call(Api.fetchRoom, roomId, auth.get('token'));

    yield put(fetchRoomSucceeded(data));
  } catch (error) {
    console.error('Error when fetching room:', error); // eslint-disable-line no-console
    yield put(fetchRoomFailed(error));
  }
}

export default function* rootSaga() {
  yield [
    yield takeLatest(FETCH_ROOMS, fetchRooms),
    yield takeLatest(FETCH_ROOM, fetchRoom)
  ];
}
