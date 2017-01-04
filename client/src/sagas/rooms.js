import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Api from '../services/api';
import {
  FETCH_ROOMS, fetchRoomsSucceeded, fetchRoomsFailed,
  FETCH_ROOM, fetchRoomSucceeded, fetchRoomFailed,
  JOIN_ROOM, joinRoomSucceeded, joinRoomFailed
} from '../actions';
import { getAuth } from '../selectors';

/**
 * Fetch rooms accessible by the user
 * @yield {Object}
 */
function* fetchRooms() {
  try {
    const auth = yield select(getAuth);
    const data = yield call(Api.fetchRooms, {}, auth.get('token'));

    yield put(fetchRoomsSucceeded(data));
  } catch (error) {
    console.error('Error when fetching rooms:', error); // eslint-disable-line no-console
    yield put(fetchRoomsFailed(error));
  }
}

/**
 * Fetch room
 * @param {String} options.roomId
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

/**
 * Join a room
 * @param {String} options.name
 */
function* joinRoom({ name, id }) {
  try {
    const auth = yield select(getAuth);
    const userData = yield call(Api.getMe, auth.get('token'));

    if (id) {
      const data = yield call(Api.joinRoom, id, auth.get('token'));
      yield put(joinRoomSucceeded(data));
    }
    else {
      const data = yield call(Api.createRoom, { name }, auth.get('token'));

      // Not the admin, then join the room
      if (data.admin._id !== userData._id) {
        yield call(Api.joinRoom, data._id, auth.get('token'))
      }

      yield put(joinRoomSucceeded(data));
      yield put(push(`/room/${data._id}`));
    }
  } catch (error) {
    console.error('Error when joining room:', error); // eslint-disable-line no-console
    yield put(joinRoomFailed(error));
  }
}

export default function* rootSaga() {
  yield [
    yield takeLatest(FETCH_ROOMS, fetchRooms),
    yield takeLatest(FETCH_ROOM, fetchRoom),
    yield takeLatest(JOIN_ROOM, joinRoom)
  ];
}
