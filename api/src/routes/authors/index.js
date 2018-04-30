import { merge } from 'ramda';
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
  getAuthorFromLibrary: {
    method: 'GET',
    route: '/library/author/:author_id',
    handler: async (
      { params: { author_id }, headers: { authorization } },
      res
    ) => {
      const { user_id } = await authenticate(authorization);
      return res.json(await UserAuthor.query().findById([user_id, author_id]));
    },
  },
  getAuthorsFromLibrary: {
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
  updatePoemFromLibrary: {
    method: 'PUT',
    route: '/library/authors',
    handler: async ({ body, headers: { authorization } }, res) => {
      const { user_id } = await authenticate(authorization);
      const poemLib = await UserAuthor.query().findById([
        user_id,
        body.author_id,
      ]);
      if (poemLib) {
        res.json(
          await UserAuthor.query().patchAndFetchById(
            [this.userId, body.poemId],
            merge({ user_id: this.userId }, body)
          )
        );
      } else {
        res.json(
          await UserAuthor.query().insert(merge({ user_id: this.userId }, body))
        );
      }
    },
  },
};

export default routes;
