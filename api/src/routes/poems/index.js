import { merge, filter, prop } from 'ramda';
import { Poem, PoemInfo } from '@@database';
import { parseFilters, parseConnection } from '@@utils/pagination';
import { authenticate } from '@@utils/authentication';
import { flattenProp, map, resolveP } from '@@utils/ramda';
import { format } from 'date-fns';

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
      const dbQuery = Poem.query().filter(filters);

      if (query.search) {
        dbQuery.andWhere('title', 'ilike', `%${query.search}%`);
      }

      return dbQuery
        .then(parseConnection(Poem, { query, filters }))
        .then(data => res.json(data));
    },
  },
  getPoemFromLibrary: {
    method: 'GET',
    route: '/library/poems/:poem_id',
    handler: async ({ params: { poem_id }, context: { oauth_id } }, res) => {
      const { user_id } = await authenticate(oauth_id);
      return res.json(await PoemInfo.query().findById([user_id, poem_id]));
    },
  },
  getPoemsFromLibrary: {
    method: 'GET',
    route: '/library/poems',
    handler: async ({ query, context: { oauth_id } }, res) => {
      const { user_id } = await authenticate(oauth_id);
      const id = 'poem_id';
      const filters = parseFilters(merge({ id }, query));
      const dbQuery = PoemInfo.query().eager('poem');

      if (query.search) {
        dbQuery.modifyEager('poem', builder => {
          builder.andWhere('title', 'ilike', `%${query.search}%`);
        });
      }

      return dbQuery
        .where('user_id', user_id)
        .andWhere('in_library', true)
        .filter(filters)
        .then(resolveP(map(flattenProp('poem'))))
        .then(resolveP(filter(prop('poem'))))
        .then(
          parseConnection(PoemInfo, {
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
    handler: async ({ body, context: { oauth_id } }, res) => {
      const { user_id } = await authenticate(oauth_id);
      const poemLib = await PoemInfo.query().findById([user_id, body.poem_id]);
      console.log({ poemLib });
      if (poemLib) {
        res.json(
          await PoemInfo.query().patchAndFetchById(
            [user_id, body.poem_id],
            merge(
              { user_id, viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss') },
              body
            )
          )
        );
      } else {
        res.json(
          await PoemInfo.query().insert(
            merge(
              { user_id, viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss') },
              body
            )
          )
        );
      }
    },
  },
};

export default routes;
