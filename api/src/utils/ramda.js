import { curry, of } from 'ramda';
import { flattenPath } from 'ramda-adjunct';

export const flattenProp = curry((prop, obj) => flattenPath(of(prop), obj));

export const resolveP = curry((fn, input) => Promise.resolve(fn(input)));

export { map, pipe } from 'ramda';
