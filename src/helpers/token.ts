import { localStorageSet, localStorageGet } from './localStorage';

export const LOCAL_STORAGE_KEY_TOKEN = 'kreds_token';

export function setToken(token?: string) {
  localStorageSet(LOCAL_STORAGE_KEY_TOKEN, token);
}

export function getToken() {
  return localStorageGet(LOCAL_STORAGE_KEY_TOKEN);
}

export function requestHeaders(customHeaders: Record<string, string>) {
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
