import 'whatwg-fetch';
import queryString from 'query-string';

/**
 * Returns the response in JSON format
 * @param  {Object} res
 * @return Promise
 */
export const getJSON = res => {
  if (!res.ok) {
    return res.json().then(json => {
      const error = new Error(res.statusText || res.status);
      error.message = json.message;

      throw error;
    });
  }

  return res.json();
};

/**
 * Returns an api path
 * @param  {String} path
 * @return {String}
 */
const getApiPath = (path) => {
  return `${process.env.REACT_APP_API_HOST}/api/v1${path}`;
}

/**
 * Fetches the user with a given username and password
 * @param  {String} username
 * @param  {String} password
 * @return {Promise}
 */
export const login = (username, password) => fetch(getApiPath('/users/login'), {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    username,
    password
  })
}).then(getJSON);

/**
 * Creates a user on the backend
 * @param  {String} name
 * @param  {String} username
 * @param  {String} password
 * @return {Promise}          [description]
 */
export const register = (name, username, password) => fetch(getApiPath('/users'), {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify({
    name,
    username,
    password
  })
}).then(getJSON);

/**
 * Fetch the rooms the user is in
 * @param  {String} token
 * @return {Promise}
 */
export const fetchRooms = (filter, token) => {
  const qs = queryString.stringify(filter);

  return fetch(getApiPath(`/rooms${!qs ? '' : `?${qs}`}`), {
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${token}`
    },
    credentials: 'include'
  }).then(getJSON);
};

/**
 * Fetch a single room
 * @param  {String} roomId
 * @param  {String} token
 * @return {Promise}
 */
export const fetchRoom = (roomId, token) => fetch(getApiPath(`/rooms/${roomId}`), {
  headers: {
    'content-type': 'application/json',
    'authorization': `bearer ${token}`
  },
  credentials: 'include'
}).then(getJSON);

/**
 * Creates a room
 * @param  {String} options.name
 * @param  {String} token
 * @return {Promise}
 */
export const createRoom = ({ name }, token) => fetch(getApiPath('/rooms'), {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'authorization': `bearer ${token}`
  },
  credentials: 'include',
  body: JSON.stringify({
    name
  })
}).then(getJSON);
