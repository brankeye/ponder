import { Author, AuthorInfo } from 'database';
import { parseFilters, parseConnection } from 'utils/pagination';
import { flattenProp, map, resolveP } from 'utils/ramda';

class AuthorService {
  get = ({ authorId }) => Author.query().findById(authorId);

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
    const dbQuery = Author.query();

    if (search) {
      dbQuery.where('name', 'ilike', `%${search}%`);
    }

    return dbQuery.filter(filters).then(
      parseConnection(Author, {
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
    const filters = parseFilters({
      id: 'author_id',
      first,
      last,
      after,
      before,
    });
    const dbQuery = AuthorInfo.query();

    if (search) {
      dbQuery.eager('author').modifyEager('author', builder => {
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
    const filters = parseFilters({
      id: 'author_id',
      first,
      last,
      after,
      before,
    });
    const dbQuery = AuthorInfo.query();

    if (search) {
      dbQuery.eager('author').modifyEager('author', builder => {
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
          hasNextPage,
          hasPreviousPage,
          filters,
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
}

export default AuthorService;
