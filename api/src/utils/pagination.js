import { curry, prop, reverse } from 'ramda';

export const encodeCursor = (cursor: any) =>
  cursor ? Buffer.from(cursor).toString('base64') : undefined;

export const decodeCursor = (cursor: string) =>
  cursor ? Buffer.from(cursor, 'base64').toString() : undefined;

export const createEdge = curry((cursorKey, columnToString, input) => ({
  cursor: encodeCursor(columnToString(prop(cursorKey, input))),
  node: input,
}));

export const createEdges = curry((cursorKey, columnToString, inputs) =>
  inputs.map(createEdge(cursorKey, columnToString))
);

export const parseConnection = ({
  column,
  first,
  last,
  before,
  after,
  columnToString = x => x,
}) => async (data: any) => {
  console.log({ column, first, last, before, after, data });

  first = first ? parseInt(first) : first;
  last = last ? parseInt(last) : last;

  let edges;
  let hasNextPage = false;
  let hasPreviousPage = false;

  if (data && data.length > 0) {
    const cursorId = before
      ? decodeCursor(before)
      : after
        ? decodeCursor(after)
        : undefined;

    if (cursorId) {
      if (first) {
        hasPreviousPage = true;
        data.shift();
        if (data.length > first) {
          data.pop();
          hasNextPage = true;
        }
      } else if (last) {
        hasNextPage = true;
        data.pop();
        if (data.length > last) {
          data.shift();
          hasPreviousPage = true;
        }
      }
    } else {
      if (first) {
        hasPreviousPage = false;
        if (data.length > first) {
          hasNextPage = true;
        }
        while (data.length > first) {
          data.pop();
        }
      } else if (last) {
        hasNextPage = false;
        if (data.length > last) {
          hasPreviousPage = true;
        }
        while (data.length > last) {
          data.shift();
        }
      }
    }
  }

  if (!data || !data.length || data.length === 0) {
    edges = [];
  } else {
    data = first ? data : reverse(data);
    edges = createEdges(column, columnToString, data);
  }

  const startId = data.length > 0 ? data[0][column] : null;
  const endId = data.length > 0 ? data[data.length - 1][column] : null;

  const pageInfo = {
    startCursor: encodeCursor(columnToString(startId)),
    endCursor: encodeCursor(columnToString(endId)),
    hasNextPage,
    hasPreviousPage,
  };

  return {
    edges,
    pageInfo,
  };
};
