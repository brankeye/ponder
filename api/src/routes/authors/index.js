import { merge } from 'ramda';
import { Author, AuthorInfo } from 'database';
import { parseFilters, parseConnection } from 'utils/pagination';
import { flattenProp, map, resolveP } from 'utils/ramda';
import { format } from 'date-fns';

const routes = {
  getAuthor: {
    method: 'GET',
    route: '/authors/:author_id',
    handler: (_, { params: { author_id } }, res) =>
      Author.query()
        .findById(author_id)
        .then(data => res.json(data)),
  },
  getAuthors: {
    method: 'GET',
    route: '/authors',
    handler: (_, { query }, res) => {
      const filters = parseFilters({ ...query, random: true });
      const dbQuery = Author.query();

      if (query.search) {
        dbQuery.where('name', 'ilike', `%${query.search}%`);
      }

      return dbQuery
        .filter(filters)
        .then(parseConnection(Author, { query, filters }))
        .then(data => res.json(data));
    },
  },
  getPoemsForAuthor: {
    method: 'GET',
    route: '/authors/:author_id/poems',
    handler: (_, { params: { author_id } }, res) =>
      Author.query()
        .findById(author_id)
        .eager('poems')
        .then(({ poems }) => res.json(poems)),
  },
  getAuthorFromLibrary: {
    method: 'GET',
    route: '/library/authors/:author_id',
    auth: true,
    handler: async (_, { params: { author_id }, context: { user } }, res) => {
      const user_id = user.id;
      return res.json(await AuthorInfo.query().findById([user_id, author_id]));
    },
  },
  getRecentAuthors: {
    method: 'GET',
    route: 'recents/authors',
    auth: true,
    handler: async (_, { query, context: { user } }, res) => {
      const user_id = user.id;
      const filters = parseFilters({ id: 'author_id', ...query });
      const dbQuery = AuthorInfo.query();

      if (query.search) {
        dbQuery.eager('author').modifyEager('author', builder => {
          builder.select('name').where('name', 'ilike', `%${query.search}%`);
        });
      }

      return dbQuery
        .where('user_id', user_id)
        .orderBy('viewed_at')
        .filter(filters)
        .then(resolveP(map(flattenProp('author'))))
        .then(
          parseConnection(AuthorInfo, {
            id: 'author_id',
            query,
            filters,
          })
        )
        .then(data => res.json(data));
    },
  },
  getAuthorsFromLibrary: {
    method: 'GET',
    route: '/library/authors',
    auth: true,
    handler: async (_, { query, context: { user } }, res) => {
      const user_id = user.id;
      const filters = parseFilters({ id: 'author_id', ...query });
      const dbQuery = AuthorInfo.query();

      if (query.search) {
        dbQuery.eager('author').modifyEager('author', builder => {
          builder.select('name').where('name', 'ilike', `%${query.search}%`);
        });
      }

      return dbQuery
        .where('user_id', user_id)
        .where('in_library', true)
        .filter(filters)
        .then(resolveP(map(flattenProp('author'))))
        .then(
          parseConnection(AuthorInfo, {
            id: 'author_id',
            query,
            filters,
          })
        )
        .then(data => res.json(data));
    },
  },
  updatePoemFromLibrary: {
    method: 'PUT',
    route: '/library/authors',
    auth: true,
    handler: async (_, { body, context: { user } }, res) => {
      const user_id = user.id;
      const authorLib = await AuthorInfo.query().findById([
        user_id,
        body.author_id,
      ]);
      if (authorLib) {
        res.json(
          await AuthorInfo.query().patchAndFetchById(
            [user_id, body.author_id],
            merge(
              { user_id, viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss') },
              body
            )
          )
        );
      } else {
        res.json(
          await AuthorInfo.query()
            .insert(
              merge(
                {
                  user_id,
                  viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
                },
                body
              )
            )
            .returning('*')
        );
      }
    },
  },
};

export default routes;
