import { localStorageSet, localStorageGet } from './localStorage';

export enum LocalStorageKeys {
  TOKEN = 'kreds_token',
  REFRESH_TOKEN = 'kreds_refresh_token',
}

export function setToken(token?: string) {
  localStorageSet(LocalStorageKeys.TOKEN, token);
}

export function getToken() {
  return localStorageGet(LocalStorageKeys.TOKEN);
}

export function setRefreshToken(token?: string) {
  localStorageSet(LocalStorageKeys.REFRESH_TOKEN, token);
}

export function getRefreshToken() {
  return localStorageGet(LocalStorageKeys.REFRESH_TOKEN);
}

export function requestHeaders(customHeaders?: Record<string, string>) {
  if (getToken()) {
    return {
      ...customHeaders,
      Authorization: 'Bearer ' + getToken(),
    };
  } else {
    return {
      ...customHeaders,
    };
  }
}
