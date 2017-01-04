export const LOGIN = 'app/AUTH/LOGIN';
export const LOGIN_SUCCEEDED = 'app/AUTH/LOGIN_SUCCEEDED';
export const LOGIN_FAILED = 'app/AUTH/LOGIN_FAILED';

export const login = (username, password) => ({ type: LOGIN, username, password });
export const loginSucceeded = token => ({ type: LOGIN_SUCCEEDED, token });
export const loginFailed = error => ({ type: LOGIN_FAILED, error });

export const REGISTER = 'app/AUTH/REGISTER';
export const REGISTER_SUCCEEDED = 'app/AUTH/REGISTER_SUCCEEDED';
export const REGISTER_FAILED = 'app/AUTH/REGISTER_FAILED';

export const register = (name, username, password) => ({ type: REGISTER, name, username, password });
export const registerSucceeded = data => ({ type: REGISTER_SUCCEEDED, data });
export const registerFailed = error => ({ type: REGISTER_FAILED, error });
