import { reverse } from 'ramda';

const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.get({ id }),
    authorList: (root, { first, last, before, after }, { Author }) => {
      const cursorId = before
        ? Buffer.from(before, 'base64').toString()
        : after ? Buffer.from(after, 'base64').toString() : undefined;
      const sign = before ? '>' : '<';
      const directionSign = first ? '>' : '<';
      const orderBy = first ? ['id', 'desc'] : ['id'];
      return Author.getAll({
        where: cursorId ? ['id', sign, cursorId] : undefined,
        orderBy,
        limit: [first || last],
      }).then(authors => {
        authors = first ? authors : reverse(authors);
        const edges = authors.map(author => ({
          cursor: Buffer.from(author.id.toString()).toString('base64'),
          node: author,
        }));

        return {
          edges,
          pageInfo: {
            hasNextPage: () => {
              const authorId = authors[authors.length - 1].id;
              return Author.findOne({
                where: ['id', directionSign, authorId],
                orderBy,
              }).then(Boolean);
            },
            hasPreviousPage: () => {
              const authorId = authors[0].id;
              return Author.findOne({
                where: ['id', directionSign, authorId],
                orderBy,
              }).then(Boolean);
            },
            endCursor: Buffer.from(
              authors[authors.length - 1].id.toString()
            ).toString('base64'),
          },
        };
      });

      //return Author.getAll({ limit, offset });
    },
  },
  Author: {
    poems: ({ id }, args, { Author }) => Author.getPoems({ id }),
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
