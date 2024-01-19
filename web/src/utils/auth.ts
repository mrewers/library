import { WebAuth } from 'auth0-js';
import decode from 'jwt-decode';

/**
 * Get Auth0 variables from the environment.
 */
const {
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_CLIENT_DOMAIN,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_REDIRECT,
  VITE_AUTH0_SCOPE,
} = import.meta.env as Record<string, string>;

/**
 * The key of the local storage pair used to save the post-auth redirect path.
 */
const AUTH_REDIRECT_STATE = 'library-auth-redirect';

/**
 * Initialize Auth0 client.
 */
const auth = new WebAuth({
  clientID: VITE_AUTH0_CLIENT_ID,
  domain: VITE_AUTH0_CLIENT_DOMAIN,
});

/**
 * Initiate a login.
 * 
 * @param callback The URI the user is redirected to upon successful login.
 */
const login = (callback?: string): void => {
  localStorage.setItem(AUTH_REDIRECT_STATE, callback || '');

  auth.authorize({
    audience: VITE_AUTH0_AUDIENCE,
    redirectUri: VITE_AUTH0_REDIRECT,
    responseType: 'token id_token',
    scope: VITE_AUTH0_SCOPE,
    state: AUTH_REDIRECT_STATE,
  });
};

/**
 * Retrieve a value from local storage by key name.
 *
 * @param key The key of the item to retrieve.
 */
const getFromStorage = (key: string): string => {
  const item = localStorage.getItem(key);
  
  if (item === null) {
    return ''
  }

  return item;
};

/**
 * Remove a value from local storage by key name.
 *
 * @param key The key of the item to retrieve.
 */
const clearFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Helper function that will allow us to extract the access_token and id_token.
 *
 * @param paramName Parameter name to search for.
 */
const getParameterByName = (paramName: string): string => {
  const match = RegExp(`[#&]${paramName}=([^&]*)`, 'u').exec(window.location.hash);

  if (match === null) {
    return '';
  }

  return decodeURIComponent(match[1].replace(/\+/gu, ' '));
};

/**
 * Get the token value from the URL parameters and save it in local storage.
 *
 * @param {string} tokenName
 */
const setToken = (tokenName: 'access_token' | 'id_token'): void => {
  let key;

  switch (tokenName) {
    case 'access_token':
      key = 'access_token';
      break;
    case 'id_token':
      key = 'id_token';
      break;
    default:
      key = '';
  }

  localStorage.setItem(key, getParameterByName(tokenName));
};

/**
 * Retrieves the post-auth redirection path from local storage
 * and then removes that entry from local storage.
 */
const getAuthRedirect = (): string => {
  const redirect = getFromStorage(AUTH_REDIRECT_STATE);
  
  clearFromStorage(AUTH_REDIRECT_STATE);

  return redirect;
}

/**
 * Retrieves the token expiration date.
 *
 * @param encodedToken Token
 */
const getTokenExpirationDate = (encodedToken: string): Date | null => {
  interface IToken {
    at_hash?: string; // eslint-disable-line camelcase, @typescript-eslint/naming-convention
    aud?: string;
    exp?: number;
    iat?: number;
    iss?: string;
    nonce?: string;
    sub?: string;
  }

  if (!encodedToken) {
    return null;
  }

  const token: IToken = decode(encodedToken);

  if (typeof token.exp !== 'number') {
    return null;
  }

  const date = new Date(0);

  date.setUTCSeconds(token.exp);

  return date;
};

/**
 * Checks whether or not a token is expired.
 *
 * @param token A token
 */
const isTokenExpired = (token: string): boolean => {
  const expirationDate = getTokenExpirationDate(token);

  // Short circuit if there is no expiration date.
  if (expirationDate === null) {
    return true;
  }

  return expirationDate < new Date();
};

/**
 * Check if current user is login and the token is not expired.
 */
const isLoggedIn = (): boolean => {
  const idToken = getFromStorage('id_token');

  return Boolean(idToken) && !isTokenExpired(idToken);
};

/**
 * Clear access tokens from local storage and return to the homepage
 * Uses window.location to redirect rather than preact-route to force
 * a refresh of the page so that the logout button disappears
 */
const logout = (): void => {
  clearFromStorage('id_token');
  clearFromStorage('access_token');
  window.location.href = '/';
};

export {
  clearFromStorage,
  getAuthRedirect,
  getFromStorage,
  isLoggedIn,
  login,
  logout,
  setToken
};