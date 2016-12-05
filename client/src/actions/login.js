export const LOGIN = 'app/LOGIN/LOGIN';
export const LOGIN_SUCCEEDED = 'app/LOGIN/LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'app/LOGIN/LOGIN_FAILED';

export const login = (username, password) => ({ type: LOGIN, username, password });
export const loginSucceeded = token => ({ type: LOGIN_SUCCEEDED, token });
export const loginFailed = error => ({ type: LOGIN_FAILED, error });
