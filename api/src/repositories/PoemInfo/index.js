import { PoemInfo } from 'database/models';
import { parseConnection } from 'utils/pagination';
import { filter, prop } from 'ramda';
import { flattenProp, map, resolveP } from 'utils/ramda';
import { format } from 'date-fns';

export default {
  create: () => ({
    get: (userId, poemId) => PoemInfo.query().findById([userId, poemId]),

    upsert: async ({
      userId,
      authorId,
      poemId,
      inLibrary,
      inLibraryAt,
      viewedAt,
    }) => {
      const info = await PoemInfo.query().findById([userId, poemId]);
      return info
        ? PoemInfo.query().patchAndFetchById([userId, poemId], {
            in_library:
              typeof inLibrary === 'boolean' ? inLibrary : info.in_library,
            in_library_at: inLibraryAt || info.in_library_at,
            viewed_at: viewedAt,
          })
        : PoemInfo.query().insert({
            user_id: userId,
            author_id: authorId,
            poem_id: poemId,
            in_library: inLibrary || false,
            in_library_at: inLibraryAt || new Date(),
            viewed_at: viewedAt,
          });
    },

    getRecents: ({ userId, first, last, after, before, search }) => {
      const dbQuery = PoemInfo.query().eager('poem');

      if (search) {
        dbQuery.modifyEager('poem', builder => {
          builder.where('title', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .orderBy('viewed_at', 'desc')
        .paginate({ column: 'viewed_at', first, last, after, before })
        .then(resolveP(map(flattenProp('poem'))))
        .then(resolveP(filter(prop('poem'))))
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
      const dbQuery = PoemInfo.query().eager('poem');

      if (search) {
        dbQuery.modifyEager('poem', builder => {
          builder.where('title', 'ilike', `%${search}%`);
        });
      }

      return dbQuery
        .where('user_id', userId)
        .where('in_library', true)
        .orderBy('in_library_at', 'desc')
        .paginate({ column: 'in_library_at', first, last, before, after })
        .then(resolveP(map(flattenProp('poem'))))
        .then(resolveP(filter(prop('poem'))))
        .then(
          parseConnection({
            column: 'in_library_at',
            columnToString: x =>
              x ? format(x, 'YYYY-MM-DD HH:mm:ss') + '+00' : x,
            first,
            last,
            before,
            after,
          })
        );
    },
  }),
};
