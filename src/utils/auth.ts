const decode = require('jwt-decode'); // eslint-disable-line -- Does not work using standard imports

import * as auth0 from 'auth0-js';

const auth = new auth0.WebAuth({
  clientID: process.env.AUTH0_CLIENT_ID,
  domain: process.env.AUTH0_CLIENT_DOMAIN,
});

export const login = (): void => {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: process.env.AUTH0_REDIRECT,
    audience: process.env.AUTH0_AUDIENCE,
    scope: process.env.AUTH0_SCOPE,
  });
};

export const getIdToken = (): string => {
  return localStorage.getItem(process.env.AUTH0_ID_TOKEN_KEY);
};

export const getAccessToken = (): string => {
  return localStorage.getItem(process.env.AUTH0_ACCESS_TOKEN_KEY);
};

const clearIdToken = (): void => {
  localStorage.removeItem(process.env.AUTH0_ID_TOKEN_KEY);
};

const clearAccessToken = (): void => {
  localStorage.removeItem(process.env.AUTH0_ACCESS_TOKEN_KEY);
};

// Helper function that will allow us to extract the access_token and id_token
const getParameterByName = (name: string): string => {
  const match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);

  return decodeURIComponent(match[1].replace(/\+/g, ' '));
};

// Get and store access_token in local storage
export const setAccessToken = (): void => {
  const accessToken = getParameterByName('access_token');

  localStorage.setItem(process.env.AUTH0_ACCESS_TOKEN_KEY, accessToken);
};

// Get and store id_token in local storage
export const setIdToken = (): void => {
  const idToken = getParameterByName('id_token');

  localStorage.setItem(process.env.AUTH0_ID_TOKEN_KEY, idToken);
};

const getTokenExpirationDate = (encodedToken: string): Date | null => {
  const token = decode(encodedToken);

  if (!token || !token.exp) {
    return null;
  }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
};

const isTokenExpired = (token: string): boolean => {
  const expirationDate = getTokenExpirationDate(token);

  return expirationDate < new Date();
};

export const isLoggedIn = (): boolean => {
  const idToken = getIdToken();

  return !!idToken && !isTokenExpired(idToken);
};

export const requireAuth = (nextState, replace) => {
  if (!isLoggedIn()) {
    replace({ pathname: '/' });
  }
};

export const logout = (): void => {
  clearIdToken();
  clearAccessToken();
  window.location.href = '/';
};
