import * as auth0 from 'auth0-js';
import jwt_decode from 'jwt-decode';

const auth = new auth0.WebAuth({
  clientID: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_CLIENT_DOMAIN,
});

/**
 * Initiate a login.
 */
export const login = (path?: string): void => {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: path ? `${process.env.AUTH0_REDIRECT}/${path}` : process.env.AUTH0_REDIRECT,
    audience: process.env.AUTH0_AUDIENCE,
    scope: process.env.AUTH0_SCOPE,
  });
};

/**
 * Retrieve a value from local storage by key name.
 *
 * @param key The key of the item to retrieve.
 */
export const getFromStorage = (key: string): string => localStorage.getItem(key);

/**
 * Remove a value from local storage by key name.
 *
 * @param key The key of the item to retrieve.
 */
export const clearFromStorage = (key: string): void => {
  localStorage.removeItem(key);
};

/**
 * Helper function that will allow us to extract the access_token and id_token.
 *
 * @param name Parameter name to search for.
 */
const getParameterByName = (name: string): string => {
  const match = RegExp(`[#&]${name}=([^&]*)`).exec(window.location.hash);

  return decodeURIComponent(match[1].replace(/\+/g, ' '));
};

/**
 * Get the token value from the URL parameters and save it in local storage.
 *
 * @param {string} tokenName
 */
export const setToken = (tokenName: 'access_token' | 'id_token'): void => {
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
 * Retrieves the token expiration date.
 *
 * @param encodedToken Token
 */
const getTokenExpirationDate = (encodedToken: string): Date | null => {
  interface IToken {
    at_hash?: string;
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

  const token = jwt_decode(encodedToken);

  if (!token.exp) {
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

  return expirationDate < new Date();
};

/**
 * Check if current user is login and the token is not expired.
 */
export const isLoggedIn = (): boolean => {
  const idToken = getFromStorage('id_token');

  return Boolean(idToken) && !isTokenExpired(idToken);
};

/**
 * Clear access tokens from local storage and return to the homepage
 * Uses window.location to redirect rather than preact-route to force a refresh of the page so that the logout button disappears
 */
export const logout = (): void => {
  clearFromStorage('id_token');
  clearFromStorage('access_token');
  window.location.href = '/';
};
