import { reverse } from 'ramda';
import { createEdges, encodeCursor, decodeCursor } from '@@schema/utils';

const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get({ id }),
    authorList: (root, { first, last, before, after, sortBy }, { Author }) => {
      if (first && first <= 0 && (!last || last <= 0)) {
        throw new Error("Argument 'first' must not be less than zero.");
      } else if (last && last <= 0 && (!first || first <= 0)) {
        throw new Error("Argument 'last' must not be less than zero.");
      }

      const cursorId = before
        ? decodeCursor(before)
        : after ? decodeCursor(after) : undefined;
      const sign = first ? '<' : '>';
      const nextSign = first ? '<' : '<';
      const prevSign = first ? '>' : '>';
      const orderBy = sortBy ? sortBy : first ? ['id', 'desc'] : ['id'];
      return Author.getAll({
        where: cursorId && ['id', sign, cursorId],
        orderBy,
        limit: [first || last],
      }).then(authors => {
        let edges;

        if (!authors || !authors.length || authors.length === 0) {
          edges = [];
        } else {
          authors = first ? authors : reverse(authors);
          edges = createEdges('id', authors);
        }

        const startId = authors.length > 0 ? authors[0].id : null;
        const endId =
          authors.length > 0 ? authors[authors.length - 1].id : null;

        return {
          edges,
          pageInfo: {
            hasNextPage: () => {
              if (!endId) return false;
              return Author.findOne({
                select: ['id'],
                where: ['id', nextSign, endId],
                orderBy,
              }).then(Boolean);
            },
            hasPreviousPage: () => {
              if (!startId) return false;
              return Author.findOne({
                select: ['id'],
                where: ['id', prevSign, startId],
                orderBy,
              }).then(Boolean);
            },
            startCursor: encodeCursor(startId),
            endCursor: encodeCursor(endId),
          },
        };
      });
    },
  },
  Author: {
    poems: ({ id, poems }, args, { Author }) =>
      poems ? { ...poems } : Author.getPoems({ id }),
    isFavorited: ({ isFavorited, prefs }) => {
      if (isFavorited) return isFavorited;
      if (prefs) return prefs.isFavorited;
      return false;
    },
    isBookmarked: ({ isBookmarked, prefs }) => {
      if (isBookmarked) return isBookmarked;
      if (prefs) return prefs.isFavorited;
      return false;
    },
  },
  PageInfo: {
    hasNextPage: connection => connection.hasNextPage(),
    hasPreviousPage: connection => connection.hasPreviousPage(),
  },
};

export default resolver;
