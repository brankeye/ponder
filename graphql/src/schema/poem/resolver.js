import { reverse } from 'ramda';
import { createEdges, encodeCursor, decodeCursor } from '@@schema/utils';

const resolver = {
  Query: {
    poem: (root, { id }, { Poem }) => Poem.get({ id }),
    poemList: (root, { first, last, before, after }, { Poem }) => {
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
      const orderBy = first ? ['id', 'desc'] : ['id'];
      return Poem.getAll({
        where: cursorId ? ['id', sign, cursorId] : undefined,
        orderBy,
        limit: [first || last],
      }).then(poems => {
        let edges;

        if (!poems || !poems.length || poems.length === 0) {
          edges = [];
        } else {
          poems = first ? poems : reverse(poems);
          edges = createEdges('id', poems);
        }

        const startId = poems.length > 0 ? poems[0].id : null;
        const endId = poems.length > 0 ? poems[poems.length - 1].id : null;

        return {
          edges,
          pageInfo: {
            hasNextPage: () => {
              if (!endId) return false;
              return Poem.findOne({
                select: ['id'],
                where: ['id', nextSign, endId],
                orderBy,
              }).then(Boolean);
            },
            hasPreviousPage: () => {
              if (!startId) return false;
              return Poem.findOne({
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
  Poem: {
    teaser: ({ lines }) => lines.slice(0, 4),
    author: ({ authorId }, args, { Author }) => Author.get({ id: authorId }),
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
};

export default resolver;
