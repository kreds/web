export function localStorageSet<T>(key: string, item?: T) {
  if (!item) {
    localStorage.removeItem(key);
  } else {
    switch (typeof item) {
      case 'string':
        localStorage.setItem(key, item);
        break;
      case 'object':
        localStorage.setItem(key, JSON.stringify(item));
        break;
      default:
        localStorage.setItem(key, item + '');
    }
  }
}

export function localStorageGet<T>(key: string, defaultValue?: T) {
  const item = localStorage.getItem(key);

  if (!item) {
    return defaultValue;
  } else {
    return item;
  }
}
