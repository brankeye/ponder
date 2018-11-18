import { AuthorInfo } from 'database/models';
import { parseConnection } from 'utils/pagination';
import { filter, prop } from 'ramda';
import { flattenProp, map, resolveP } from 'utils/ramda';
import { format } from 'date-fns';

export default {
  create: () => ({
    get: (userId, authorId) => AuthorInfo.query().findById([userId, authorId]),

    upsert: async ({ userId, authorId, viewedAt, inLibrary }) => {
      const info = await AuthorInfo.query().findById([userId, authorId]);
      return info
        ? AuthorInfo.query().patchAndFetchById([userId, authorId], {
            viewed_at: viewedAt,
            in_library: inLibrary || info.in_library,
          })
        : AuthorInfo.query().insert({
            user_id: userId,
            author_id: authorId,
            in_library: inLibrary || false,
            viewed_at: viewedAt,
          });
    },

    getRecents: ({ userId, first, last, after, before, search }) => {
      const dbQuery = AuthorInfo.query().eager('author');

      if (search) {
        dbQuery.modifyEager('author', builder => {
          builder.where('name', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .orderBy('viewed_at', 'desc')
        .paginate({
          column: 'viewed_at',
          first,
          last,
          after,
          before,
        })
        .then(resolveP(map(flattenProp('author'))))
        .then(resolveP(filter(prop('author'))))
        .then(
          parseConnection({
            column: 'viewed_at',
            columnToString: x =>
              x ? format(x, 'YYYY-MM-DD HH:mm:ss') + '+00' : x,
            first,
            last,
            before,
            after,
          })
        );
    },

    getLibrary: ({ userId, first, last, after, before, search }) => {
      const dbQuery = AuthorInfo.query().eager('author');

      if (search) {
        dbQuery.modifyEager('author', builder => {
          builder.where('name', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .where('in_library', true)
        .paginate({
          column: 'author_id',
          first,
          last,
          after,
          before,
        })
        .then(resolveP(map(flattenProp('author'))))
        .then(
          parseConnection({
            column: 'author_id',
            first,
            last,
            before,
            after,
          })
        );
    },
  }),
};
