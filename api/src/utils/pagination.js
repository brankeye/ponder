import { curry, prop, reverse } from 'ramda';

export const encodeCursor = (cursor: any) =>
  cursor ? Buffer.from(cursor).toString('base64') : undefined;

export const decodeCursor = (cursor: string) =>
  cursor ? Buffer.from(cursor, 'base64').toString() : undefined;

export const createEdge = curry((cursorKey, input) => ({
  cursor: encodeCursor(prop(cursorKey, input)),
  node: input,
}));

export const createEdges = curry((cursorKey, inputs) =>
  inputs.map(createEdge(cursorKey))
);

export const parseFilters = ({ id = 'id', first, last, before, after }) => {
  first = first ? parseInt(first) : first;
  last = last ? parseInt(last) : last;

  if (first && first <= 0 && (!last || last <= 0)) {
    throw new Error("Argument 'first' must not be less than zero.");
  } else if (last && last <= 0 && (!first || first <= 0)) {
    throw new Error("Argument 'last' must not be less than zero.");
  }

  if (first) first += 2;
  if (last) last += 2;

  const cursorId = before
    ? decodeCursor(before)
    : after
      ? decodeCursor(after)
      : undefined;
  const sign = parseSign(first);
  const where = cursorId && [id, sign, cursorId];
  const orderBy = first ? [id, 'desc'] : [id];
  const limit = [first || last];

  return { where, orderBy, limit };
};

export const parseSign = first => (first ? '<=' : '>=');

export const parseConnection = (
  Model,
  { id = 'id', first, last, before, after }
) => async (data: any) => {
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
        data = data.filter(x => x[id] !== cursorId);
        if (data.length > first) {
          data.shift();
          hasNextPage = true;
        }
      } else if (last) {
        hasNextPage = true;
        data = data.filter(x => x[id] !== cursorId);
        if (data.length > last) {
          data.pop();
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
    edges = createEdges(id, data);
  }

  const startId = data.length > 0 ? data[0][id] : null;
  const endId = data.length > 0 ? data[data.length - 1][id] : null;

  const pageInfo = {
    startCursor: encodeCursor(startId),
    endCursor: encodeCursor(endId),
    hasNextPage,
    hasPreviousPage,
  };

  return {
    edges,
    pageInfo,
  };
};
