export const FETCH_ROOMS = 'app/ROOMS/FETCH_ROOMS';
export const FETCH_ROOMS_SUCCEEDED = 'app/ROOMS/FETCH_ROOMS_SUCCEEDED';
export const FETCH_ROOMS_FAILED = 'app/ROOMS/FETCH_ROOMS_FAILED';

export const fetchRooms = () => ({ type: FETCH_ROOMS });
export const fetchRoomsSucceeded = rooms => ({ type: FETCH_ROOMS_SUCCEEDED, rooms });
export const fetchRoomsFailed = error => ({ type: FETCH_ROOMS_FAILED, error });

export const FETCH_ROOM = 'app/ROOMS/FETCH_ROOM';
export const FETCH_ROOM_SUCCEEDED = 'app/ROOMS/FETCH_ROOM_SUCCEEDED';
export const FETCH_ROOM_FAILED = 'app/ROOMS/FETCH_ROOM_FAILED';

export const fetchRoom = roomId => ({ type: FETCH_ROOM, roomId })
export const fetchRoomSucceeded = room => ({ type: FETCH_ROOM_SUCCEEDED, room })
export const fetchRoomFailed = error => ({ type: FETCH_ROOM_FAILED, error });

export const SEND_MESSAGE = 'app/ROOLMS/SEND_MESSAGE';
export const SEND_MESSAGE_SUCCEEDED = 'app/ROOLMS/SEND_MESSAGE_SUCCEEDED';
export const SEND_MESSAGE_FAILED = 'app/ROOLMS/SEND_MESSAGE_FAILED';

export const sendMessage = message => ({ type: SEND_MESSAGE, message });
export const sendMessageSucceeded = message => ({ type: SEND_MESSAGE_SUCCEEDED, message });
export const sendMessageFailed = error => ({ type: SEND_MESSAGE_FAILED, error });

export const JOIN_ROOM = 'app/ROOMS/JOIN_ROOM';
export const JOIN_ROOM_SUCCEEDED = 'app/ROOMS/JOIN_ROOM_SUCCEEDED';
export const JOIN_ROOM_FAILED = 'app/ROOMS/JOIN_ROOM_FAILED';

export const joinRoom = (name, createIfNotExists = false) => ({ type: JOIN_ROOM, name, createIfNotExists });
export const joinRoomSucceeed = data => ({ type: JOIN_ROOM_SUCCEEDED, data });
export const joinRoomFailed = error => ({ type: JOIN_ROOM_FAILED, error });
