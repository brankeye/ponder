import { Author, UserAuthor } from '@@database';
import { parseFilters, parseConnection } from '@@utils/pagination';
import { authenticate } from '@@utils/authentication';

const routes = {
  getAuthor: {
    method: 'GET',
    route: '/authors/:author_id',
    handler: ({ params: { author_id } }, res) =>
      Author.query()
        .findById(author_id)
        .then(data => res.json(data)),
  },
  getAuthors: {
    method: 'GET',
    route: '/authors',
    handler: ({ query }, res) => {
      const filters = parseFilters(query);
      return Author.query()
        .filter(filters)
        .then(parseConnection(Author, { query, filters }))
        .then(data => res.json(data));
    },
  },
  getLibrary: {
    method: 'GET',
    route: '/library/authors',
    handler: async ({ query, headers: { authorization } }, res) => {
      const { user_id } = await authenticate(authorization);
      const filters = parseFilters({ id: 'author_id', ...query });
      return UserAuthor.query()
        .where('user_id', user_id)
        .filter(filters)
        .then(
          parseConnection(UserAuthor, {
            id: 'author_id',
            query,
            filters,
          })
        )
        .then(data => res.json(data));
    },
  },
};

export default routes;
