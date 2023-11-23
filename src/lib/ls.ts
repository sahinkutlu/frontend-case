export const saveToLS = <T>(key: string, value: T) => {
  return window.localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLS = (key: string) => {
  const item = window.localStorage.getItem(key);

  return item ? JSON.parse(item) : "";
};
