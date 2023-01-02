export * from './Article';
export * from './Category';
export * from './Language';

export type WithoutID<T> = Omit<T, 'id'>;
