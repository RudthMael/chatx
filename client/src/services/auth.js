export const LOCAL_STORAGE_TOKEN_KEY = 'chatx__token';

/**
 * Redirects the user to /login if no token has been found
 * @param  {Objec} nextState
 * @param  {Function} replace
 */
export const requireAuth = (nextState, replace) => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

  if (!token) {
    return replace('/login');
  }
};
