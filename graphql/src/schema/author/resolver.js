import { reverse } from 'ramda';
import { createEdges, encodeCursor, decodeCursor } from '@@schema/utils';

const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get({ id }),
    authorList: (
      root,
      { first, last, before, after, sortBy, hasType },
      { Author }
    ) => {
      console.log(hasType);
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
  PageInfo: {
    hasNextPage: connection => connection.hasNextPage(),
    hasPreviousPage: connection => connection.hasPreviousPage(),
  },
  AuthorContract: {
    __resolveType: ({ poems }) => (poems ? 'Author' : 'AuthorDetails'),
    isFavorited: ({ is_favorited, prefs }) => {
      if (is_favorited) return is_favorited;
      if (prefs) return prefs.is_favorited;
      return false;
    },
    isBookmarked: ({ is_bookmarked, prefs }) => {
      if (is_bookmarked) return is_bookmarked;
      if (prefs) return prefs.is_bookmarked;
      return false;
    },
  },
  Author: {
    poems: ({ id, poems }, args, { Author }) =>
      poems ? { ...poems } : Author.getPoems({ id }),
  },
};

export default resolver;
