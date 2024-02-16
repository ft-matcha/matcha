export const setLocalStorage = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const getLocalStorgae = (key: string) => {
  return window.localStorage.getItem(key);
};

export const setToken = (key: string, value: string) => {
  setLocalStorage(key, value);
};

export const deleteToken = (key: string) => {
  window.localStorage.removeItem(key);
};

export const getToken = (key: string) => {
  console.log(getLocalStorgae(key));
  return getLocalStorgae(key);
};
