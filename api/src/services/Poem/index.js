import { Poem, PoemInfo } from 'database';
import { raw } from 'objection';
import { parseFilters, parseConnection } from 'utils/pagination';
import { flattenProp, map, resolveP } from 'utils/ramda';
import { filter, prop, head } from 'ramda';
import { format } from 'date-fns';

class PoemService {
  constructor(context) {
    this.context = context;
  }

  getPoem = poemId => Poem.query().findById(poemId);

  discover = () =>
    Poem.query()
      .orderBy(raw('random()'))
      .limit(1)
      .then(head);

  getRecents = ({ userId, first, last, after, before, search }) => {
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
          last,
          before,
          after,
        })
      );
  };

  getLibrary = ({ userId, first, last, after, before, search }) => {
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
          last,
          before,
          after,
        })
      );
  };

  getInfo = async (userId, poemId) => {
    const info = await PoemInfo.query().findById([userId, poemId]);
    if (info) return info;
    const poem = await this.getPoem(poemId);
    return {
      user_id: userId,
      poem_id: poemId,
      author_id: poem.author_id,
      in_library: false,
      viewed_at: null,
    };
  };

  getInfosByAuthor = ({ userId, authorId }) =>
    PoemInfo.query()
      .where('user_id', userId)
      .andWhere('author_id', authorId);

  updateLibrary = async ({ userId, poemId, inLibrary }) => {
    const { author } = await this.getPoem(poemId).eager('author');
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

  updateView = async ({ userId, poemId }) => {
    const { author } = await this.getPoem(poemId).eager('author');
    const poemLib = await PoemInfo.query().findById([userId, poemId]);
    let result;
    if (poemLib) {
      result = await PoemInfo.query().patchAndFetchById([userId, poemId], {
        viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    } else {
      result = await PoemInfo.query().insert({
        user_id: userId,
        poem_id: poemId,
        author_id: author.id,
        in_library: false,
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
