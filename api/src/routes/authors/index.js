import { merge } from 'ramda';
import { Author, AuthorInfo } from '@@database';
import { parseFilters, parseConnection } from '@@utils/pagination';
import { authenticate } from '@@utils/authentication';
import { flattenProp, map, resolveP } from '@@utils/ramda';
import { format } from 'date-fns';

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
  getPoemsForAuthor: {
    method: 'GET',
    route: '/authors/:author_id/poems',
    handler: ({ params: { author_id } }, res) =>
      Author.query()
        .findById(author_id)
        .eager('poems')
        .then(({ poems }) => res.json(poems)),
  },
  getAuthorFromLibrary: {
    method: 'GET',
    route: '/library/authors/:author_id',
    handler: async (
      { params: { author_id }, headers: { authorization } },
      res
    ) => {
      const { user_id } = await authenticate(authorization);
      return res.json(await AuthorInfo.query().findById([user_id, author_id]));
    },
  },
  getAuthorsFromLibrary: {
    method: 'GET',
    route: '/library/authors',
    handler: async ({ query, headers: { authorization } }, res) => {
      const { user_id } = await authenticate(authorization);
      const filters = parseFilters({ id: 'author_id', ...query });
      return AuthorInfo.query()
        .where('user_id', user_id)
        .andWhere('in_library', true)
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
    handler: async ({ body, headers: { authorization } }, res) => {
      const { user_id } = await authenticate(authorization);
      const poemLib = await AuthorInfo.query().findById([
        user_id,
        body.author_id,
      ]);
      if (poemLib) {
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
