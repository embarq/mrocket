export const isFunction = (value: any): value is Function => {
  return typeof value === 'function';
};

export const isValidString = (value: any): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
}

export const isPromise = <T = unknown>(value: any): value is Promise<T> => isFunction(value.then);

export const createId = (payload: any) => {
  return window.btoa(JSON.stringify(payload)).replace(/=/g, '').slice(0, 32);
}