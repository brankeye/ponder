// @flow

import { curry, prop, reverse } from 'ramda';
import { raw } from 'objection';

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

export const parseFilters = ({
  id = 'id',
  first,
  last,
  before,
  after,
  random,
}: {
  id: string,
  first: number,
  last: number,
  before: string,
  after: string,
  random: ?boolean,
}) => {
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
  const { sign } = parseSigns(first);
  const where = random && cursorId && [id, sign, cursorId];
  const orderBy = random ? [raw('random()')] : first ? [id, 'desc'] : [id];
  const limit = [first || last];

  return {
    where,
    orderBy,
    limit,
  };
};

export const parseSigns = (first: number) => ({
  sign: first ? '<' : '>',
  nextSign: first ? '<' : '<',
  prevSign: first ? '>' : '>',
});

export const parseConnection = (
  Model: Object,
  {
    id = 'id',
    first,
    hasNextPage,
    hasPreviousPage,
    filters: { orderBy },
  }: {
    id: string,
    first: number,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    filters: Object,
  }
) => async (data: any) => {
  const { nextSign, prevSign } = parseSigns(first);

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
    hasNextPage: undefined,
    hasPreviousPage: undefined,
  };

  if (hasNextPage) {
    pageInfo.hasNextPage = !endId
      ? false
      : await Model.query()
          .findOne(...[id, nextSign, endId])
          .select(...[id])
          .orderBy(...orderBy)
          .then(Boolean);
  }

  if (hasPreviousPage) {
    pageInfo.hasPreviousPage = !startId
      ? false
      : await Model.query()
          .findOne(...[id, prevSign, startId])
          .select(...[id])
          .orderBy(...orderBy)
          .then(Boolean);
  }

  return {
    edges,
    pageInfo,
  };
};
