import { Poem, PoemInfo } from 'database';
import { parseFilters, parseConnection } from 'utils/pagination';
import { flattenProp, map, resolveP } from 'utils/ramda';
import { filter, prop } from 'ramda';
import { format } from 'date-fns';

class PoemService {
  get = ({ poemId }) => Poem.query().findById(poemId);

  getAll = ({
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
        hasNextPage,
        hasPreviousPage,
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
          hasNextPage,
          hasPreviousPage,
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
          hasNextPage,
          hasPreviousPage,
          filters,
        })
      );
  };

  getInfo = ({ userId, poemId }) => PoemInfo.query().findById([userId, poemId]);

  updateLibrary = async ({ userId, poemId, inLibrary }) => {
    const poemLib = await PoemInfo.query().findById([userId, poemId]);
    if (poemLib) {
      return PoemInfo.query().patchAndFetchById([userId, poemId], {
        in_library: inLibrary,
        viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    } else {
      return PoemInfo.query().insert({
        user_id: userId,
        poem_id: poemId,
        in_library: inLibrary,
        viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    }
  };
}

export default PoemService;
