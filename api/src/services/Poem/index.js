import { Poem, PoemInfo } from 'database';
import { parseFilters, parseConnection } from 'utils/pagination';
import { flattenProp, map, resolveP } from 'utils/ramda';
import { filter, prop } from 'ramda';
import { format } from 'date-fns';

class PoemService {
  constructor(context) {
    this.context = context;
  }

  get = ({ poemId }) => Poem.query().findById(poemId);

  getAll = async ({
    first,
    last,
    after,
    before,
    hasNextPage,
    hasPreviousPage,
    search,
  }) => {
    const filters = parseFilters({ first, last, after, before, random: true });
    const dbQuery = Poem.query();

    if (search) {
      dbQuery.where('title', 'ilike', `%${search}%`);
    }

    return dbQuery.filter(filters).then(
      parseConnection(Poem, {
        first,
        hasNextPage: async endId =>
          hasNextPage
            ? await Poem.query()
                .where('id', '<', endId)
                .filter(filters)
                .first()
                .select('id')
                .then(Boolean)
            : false,
        hasPreviousPage: async startId =>
          hasPreviousPage
            ? await Poem.query()
                .where('id', '>', startId)
                .filter(filters)
                .first()
                .select('id')
                .then(Boolean)
            : false,
        filters,
      })
    );
  };

  getRecents = ({
    userId,
    first,
    last,
    after,
    before,
    hasNextPage,
    hasPreviousPage,
    search,
  }) => {
    const filters = parseFilters({ id: 'poem_id', first, last, after, before });
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
          hasNextPage: async endId =>
            hasNextPage
              ? await PoemInfo.query()
                  .filter(filters)
                  .where('user_id', userId)
                  .whereNot('viewed_at', null)
                  .where('poem_id', '<', endId)
                  .orderBy('viewed_at')
                  .first()
                  .select('poem_id')
                  .then(Boolean)
              : false,
          hasPreviousPage: async startId =>
            hasPreviousPage
              ? await PoemInfo.query()
                  .filter(filters)
                  .where('user_id', userId)
                  .whereNotNull('viewed_at')
                  .where('poem_id', '>', startId)
                  .orderBy('viewed_at')
                  .first()
                  .select('poem_id')
                  .then(Boolean)
              : false,
          filters,
        })
      );
  };

  getLibrary = ({
    userId,
    first,
    last,
    after,
    before,
    hasNextPage,
    hasPreviousPage,
    search,
  }) => {
    const filters = parseFilters({ id: 'poem_id', first, last, after, before });
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
          hasNextPage: async endId =>
            hasNextPage
              ? await PoemInfo.query()
                  .where('user_id', userId)
                  .where('in_library', true)
                  .where('poem_id', '<', endId)
                  .filter(filters)
                  .first()
                  .select('poem_id')
                  .then(Boolean)
              : false,
          hasPreviousPage: async startId =>
            hasPreviousPage
              ? await PoemInfo.query()
                  .where('user_id', userId)
                  .where('in_library', true)
                  .where('poem_id', '>', startId)
                  .filter(filters)
                  .first()
                  .select('poem_id')
                  .then(Boolean)
              : false,
          filters,
          queryModifier: query =>
            query.where('user_id', userId).andWhere('in_library', true),
        })
      );
  };

  getInfo = ({ userId, poemId }) => PoemInfo.query().findById([userId, poemId]);

  getInfosByAuthor = ({ userId, authorId }) =>
    PoemInfo.query()
      .where('user_id', userId)
      .andWhere('author_id', authorId);

  updateLibrary = async ({ userId, poemId, inLibrary }) => {
    const { author } = await this.get({ poemId }).eager('author');
    const poemLib = await PoemInfo.query().findById([userId, poemId]);
    let result;
    if (poemLib) {
      result = await PoemInfo.query().patchAndFetchById([userId, poemId], {
        in_library: inLibrary,
        viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    } else {
      result = await PoemInfo.query().insert({
        user_id: userId,
        poem_id: poemId,
        author_id: author.id,
        in_library: inLibrary,
        viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    }

    const poemInfosByAuthor = await this.getInfosByAuthor({
      userId,
      authorId: author.id,
    });

    const authorInLibrary =
      poemInfosByAuthor &&
      poemInfosByAuthor.some(({ in_library }) => in_library);

    await this.context.AuthorService.updateLibrary({
      userId,
      authorId: author.id,
      inLibrary: authorInLibrary,
    });

    return result;
  };
}

export default PoemService;
