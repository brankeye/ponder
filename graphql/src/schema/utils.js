import { curry, prop } from 'ramda';

export const encodeCursor = cursor =>
  cursor ? Buffer.from(cursor.toString()).toString('base64') : undefined;

export const decodeCursor = cursor =>
  cursor ? Buffer.from(cursor, 'base64').toString() : undefined;

export const createEdge = curry((cursorKey, input) => ({
  cursor: encodeCursor(prop(cursorKey, input)),
  node: input,
}));

export const createEdges = curry((cursorKey, inputs) =>
  inputs.map(createEdge(cursorKey))
);
