import { Author, AuthorInfo } from 'database';
import { parseFilters, parseConnection } from 'utils/pagination';
import { flattenProp, map, resolveP } from 'utils/ramda';
import { format } from 'date-fns';

class AuthorService {
  constructor(context) {
    this.context = context;
  }

  get = ({ authorId }) => Author.query().findById(authorId);

  getAll = ({ first, last, after, before, search }) => {
    const filters = parseFilters({
      id: 'id',
      first,
      last,
      after,
      before,
      random: true,
    });
    const dbQuery = Author.query();

    if (search) {
      dbQuery.where('name', 'ilike', `%${search}%`);
    }

    return dbQuery.filter(filters).then(
      parseConnection(Author, {
        id: 'id',
        first,
        last,
        before,
        after,
      })
    );
  };

  getRecents = ({ userId, first, last, after, before, search }) => {
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
  };

  getLibrary = ({ userId, first, last, after, before, search }) => {
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
  };

  getInfo = ({ userId, authorId }) =>
    AuthorInfo.query().findById([userId, authorId]);

  poems = ({ authorId }) =>
    Author.query()
      .findById(authorId)
      .eager('poems')
      .then(({ poems }) => poems);

  updateLibrary = async ({ userId, authorId, inLibrary }) => {
    const authorLib = await AuthorInfo.query().findById([userId, authorId]);
    if (authorLib) {
      return AuthorInfo.query().patchAndFetchById([userId, authorId], {
        in_library: inLibrary,
        viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    } else {
      return AuthorInfo.query().insert({
        user_id: userId,
        author_id: authorId,
        in_library: inLibrary,
        viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    }
  };
}

export default AuthorService;
