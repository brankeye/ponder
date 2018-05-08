import { curry, reduce, assoc, keys, pick } from 'ramda';

export const renameKeys = curry((keysMap, obj) =>
  reduce((acc, key) => assoc(keysMap[key] || key, obj[key], acc), {}, keys(obj))
);

export const parsePaginationOptions = pick([
  'first',
  'after',
  'last',
  'before',
  'hasNextPage',
  'hasPreviousPage',
]);
