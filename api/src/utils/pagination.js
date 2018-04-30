import { curry, prop, reverse } from 'ramda';

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

export const parseFilters = ({ id = 'id', first, last, before, after }) => {
  if (first && first <= 0 && (!last || last <= 0)) {
    throw new Error("Argument 'first' must not be less than zero.");
  } else if (last && last <= 0 && (!first || first <= 0)) {
    throw new Error("Argument 'last' must not be less than zero.");
  }

  const cursorId = before
    ? decodeCursor(before)
    : after
      ? decodeCursor(after)
      : undefined;
  const { sign } = parseSigns({ first });
  const where = cursorId && [id, sign, cursorId];
  const orderBy = first ? [id, 'desc'] : [id];
  const limit = [first || last];

  return {
    where,
    orderBy,
    limit,
  };
};

export const parseSigns = ({ first }) => ({
  sign: first ? '<' : '>',
  nextSign: first ? '<' : '<',
  prevSign: first ? '>' : '>',
});

export const parseConnection = (
  Model,
  {
    id = 'id',
    query: { first, hasNextPage, hasPreviousPage },
    filters: { orderBy },
  }
) => async data => {
  const { nextSign, prevSign } = parseSigns({ first });

  let edges;

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
  };

  if (hasNextPage) {
    const hasNextPageFn = async () => {
      if (!endId) return false;
      return Model.query()
        .findOne(...[id, nextSign, endId])
        .select(...[id])
        .orderBy(...orderBy)
        .then(Boolean);
    };
    pageInfo.hasNextPage = await hasNextPageFn();
  }

  if (hasPreviousPage) {
    const hasPreviousPageFn = async () => {
      if (!startId) return false;
      return Model.query()
        .findOne(...[id, prevSign, startId])
        .select(...[id])
        .orderBy(...orderBy)
        .then(Boolean);
    };
    pageInfo.hasPreviousPage = await hasPreviousPageFn();
  }

  return {
    edges,
    pageInfo,
  };
};
