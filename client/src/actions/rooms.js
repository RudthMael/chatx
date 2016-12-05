export const FETCH_ROOMS = 'app/ROOMS/FETCH_ROOMS';
export const FETCH_ROOMS_SUCCEEDED = 'app/ROOMS/FETCH_ROOMS_SUCCEEDED';
export const FETCH_ROOMS_FAILED = 'app/ROOMS/FETCH_ROOMS_FAILED';

export const fetchRooms = () => ({ type: FETCH_ROOMS });
export const fetchRoomsSucceeded = rooms => ({ type: FETCH_ROOMS_SUCCEEDED, rooms });
export const fetchRoomsFailed = error => ({ type: FETCH_ROOMS_FAILED, error });
