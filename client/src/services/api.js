import 'whatwg-fetch';

/**
 * Returns the response in JSON format
 * @param  {Object} res
 * @return Promise
 */
export const getJSON = res => {
  if (!res.ok) {
    const error = new Error(res.statusText || res.status);
    error.response = res;

    throw error;
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
 * Fetch the rooms the user is in
 * @param  {String} token
 * @return {Promise}
 */
export const fetchRooms = token => fetch(getApiPath('/rooms'), {
  headers: {
    'content-type': 'application/json',
    'authorization': `bearer ${token}`
  },
  credentials: 'include'
}).then(getJSON);

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
