import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export const isFunction = (value: any): value is Function => {
  return typeof value === 'function';
};

export const isValidString = (value: any): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
}

export const isPromise = <T = unknown>(value: any): value is Promise<T> => isFunction(value.then);

export const createId = (payload: any) => {
  return window.btoa(JSON.stringify(payload)).replace(/=/g, '').slice(-32);
}

/** @pure */
export const indexedBy = <T>(key: keyof T) => (values: T[]) => {
  const map: { [_key: string]: T } = {};
  const _values = ([] as T[]).concat(values);

  let entry: T;
  while(entry = _values.pop() as T) {
    map[(entry as any)[key as string]] = entry;
  }

  return map;
}

export const getDistanceToNow = (date: Date) => {
  return formatDistanceToNow(date);
}

export const timestampToMilliseconds = (ts: firebase.firestore.Timestamp) => {
  return (ts != null) ? ts.toMillis() : null;
}