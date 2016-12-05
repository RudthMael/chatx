export const getAuth = state => state.get('auth');
export const getRooms = state => state.get('rooms');
export const getRoom = state => state.get('room');
export const getMessages = state => state.get('messages');
export const getUsers = state => state.getIn(['room', 'users']);
