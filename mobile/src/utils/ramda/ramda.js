import { eqBy, path, complement } from 'ramda';

export const eqPaths = pathArg => eqBy(path(pathArg));
export const notEqPaths = complement(eqPaths);
