export function assignObject<T extends object, K extends keyof T>(
  obj: T | undefined,
  key: K,
  value: T[K],
): T & Record<K, T[K]>;

export function assignObject<T extends object>(
  obj: T | undefined,
  rest: Partial<T>,
): T & Partial<T>;

export function assignObject<T extends object, K extends keyof T>(
  obj: T | undefined,
  keyOrRest: K | Partial<T>,
  value?: T[K],
) {
  obj = {} as T;
  if (typeof keyOrRest === 'string') {
    obj = {
      ...obj,
      [keyOrRest as K]: value,
    };
  } else {
    obj = {
      ...obj,
      ...(keyOrRest as Partial<T>),
    };
  }
}
