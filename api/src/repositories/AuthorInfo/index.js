import { AuthorInfo } from 'database/models';
import { parseFilters, parseConnection } from 'utils/pagination';
import { flattenProp, map, resolveP } from 'utils/ramda';

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
      const filters = parseFilters({
        id: 'author_id',
        first,
        last,
        after,
        before,
      });
      const dbQuery = AuthorInfo.query().eager('author');

      if (search) {
        dbQuery.modifyEager('author', builder => {
          builder.select('name').where('name', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .orderBy('viewed_at')
        .filter(filters)
        .then(resolveP(map(flattenProp('author'))))
        .then(
          parseConnection(AuthorInfo, {
            id: 'author_id',
            first,
            last,
            before,
            after,
          })
        );
    },

    getLibrary: ({ userId, first, last, after, before, search }) => {
      const filters = parseFilters({
        id: 'author_id',
        first,
        last,
        after,
        before,
      });
      const dbQuery = AuthorInfo.query().eager('author');

      if (search) {
        dbQuery.modifyEager('author', builder => {
          builder.select('name').where('name', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .where('in_library', true)
        .filter(filters)
        .then(resolveP(map(flattenProp('author'))))
        .then(
          parseConnection(AuthorInfo, {
            id: 'author_id',
            first,
            last,
            before,
            after,
          })
        );
    },
  }),
};
