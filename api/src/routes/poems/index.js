import { merge } from 'ramda';
import { Poem, UserPoem } from '@@database';
import { parseFilters, parseConnection } from '@@utils/pagination';
import { authenticate } from '@@utils/authentication';

const routes = {
  getPoem: {
    method: 'GET',
    route: '/poems/:poem_id',
    handler: ({ params: { poem_id } }, res) =>
      Poem.query()
        .findById(poem_id)
        .then(data => res.json(data)),
  },
  getPoems: {
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
  getPoemFromLibrary: {
    method: 'GET',
    route: '/library/poems/:poem_id',
    handler: async (
      { params: { poem_id }, headers: { authorization } },
      res
    ) => {
      const { user_id } = await authenticate(authorization);
      return res.json(await UserPoem.query().findById([user_id, poem_id]));
    },
  },
  getPoemsFromLibrary: {
    method: 'GET',
    route: '/library/poems',
    handler: async ({ query, headers: { authorization } }, res) => {
      const { user_id } = await authenticate(authorization);
      const id = 'poem_id';
      const filters = parseFilters(merge({ id }, query));
      return UserPoem.query()
        .where('user_id', user_id)
        .filter(filters)
        .then(
          parseConnection(UserPoem, {
            id,
            query,
            filters,
          })
        )
        .then(data => res.json(data));
    },
  },
  updatePoemFromLibrary: {
    method: 'PUT',
    route: '/library/poems',
    handler: async ({ body, headers: { authorization } }, res) => {
      const { user_id } = await authenticate(authorization);
      const poemLib = await UserPoem.query().findById([user_id, body.poem_id]);
      if (poemLib) {
        res.json(
          await UserPoem.query().patchAndFetchById(
            [this.userId, body.poemId],
            merge({ user_id: this.userId }, body)
          )
        );
      } else {
        res.json(
          await UserPoem.query().insert(merge({ user_id: this.userId }, body))
        );
      }
    },
  },
};

export default routes;
