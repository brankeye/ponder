import { Poem, UserPoem } from '@@database';
import { parseFilters, parseConnection } from '@@utils/pagination';
import { authenticate } from '@@utils/authentication';

const routes = {
  getAuthor: {
    method: 'GET',
    route: '/poems/:poem_id',
    handler: ({ params: { poem_id } }, res) =>
      Poem.query()
        .findById(poem_id)
        .then(data => res.json(data)),
  },
  getAuthors: {
    method: 'GET',
    route: '/poems',
    handler: ({ query }, res) => {
      const filters = parseFilters(query);
      return Poem.query()
        .filter(filters)
        .then(parseConnection(Poem, { query, filters }))
        .then(data => res.json(data));
    },
  },
  getLibrary: {
    method: 'GET',
    route: '/library/poems',
    handler: async ({ query, headers: { authorization } }, res) => {
      const { user_id } = await authenticate(authorization);
      const filters = parseFilters({ id: 'poem_id', ...query });
      return UserPoem.query()
        .where('user_id', user_id)
        .filter(filters)
        .then(
          parseConnection(UserPoem, {
            id: 'poem_id',
            query,
            filters,
          })
        )
        .then(data => res.json(data));
    },
  },
};

export default routes;
