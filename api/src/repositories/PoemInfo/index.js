import { PoemInfo } from 'database/models';
import { parseFilters, parseConnection } from 'utils/pagination';
import { filter, prop } from 'ramda';
import { flattenProp, map, resolveP } from 'utils/ramda';

export default {
  create: () => ({
    get: (userId, poemId) => PoemInfo.query().findById([userId, poemId]),

    upsert: async ({ userId, authorId, poemId, inLibrary, viewedAt }) => {
      const info = await PoemInfo.query().findById([userId, poemId]);
      return info
        ? PoemInfo.query().patchAndFetchById([userId, poemId], {
            in_library: inLibrary || info.in_library,
            viewed_at: viewedAt,
          })
        : PoemInfo.query().insert({
            user_id: userId,
            author_id: authorId,
            poem_id: poemId,
            in_library: inLibrary || false,
            viewed_at: viewedAt,
          });
    },

    getRecents: ({ userId, first, last, after, before, search }) => {
      const filters = parseFilters({
        id: 'poem_id',
        first,
        last,
        after,
        before,
      });
      const dbQuery = PoemInfo.query().eager('poem');

      if (search) {
        dbQuery.modifyEager('poem', builder => {
          builder.andWhere('title', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .orderBy('viewed_at')
        .filter(filters)
        .then(resolveP(map(flattenProp('poem'))))
        .then(resolveP(filter(prop('poem'))))
        .then(
          parseConnection(PoemInfo, {
            id: 'poem_id',
            first,
            last,
            before,
            after,
          })
        );
    },

    getLibrary: ({ userId, first, last, after, before, search }) => {
      const filters = parseFilters({
        id: 'poem_id',
        first,
        last,
        after,
        before,
      });
      const dbQuery = PoemInfo.query().eager('poem');

      if (search) {
        dbQuery.modifyEager('poem', builder => {
          builder.andWhere('title', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .andWhere('in_library', true)
        .filter(filters)
        .then(resolveP(map(flattenProp('poem'))))
        .then(resolveP(filter(prop('poem'))))
        .then(
          parseConnection(PoemInfo, {
            id: 'poem_id',
            first,
            last,
            before,
            after,
          })
        );
    },
  }),
};
