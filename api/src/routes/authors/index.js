import { merge } from 'ramda';
import { AuthorInfo } from 'database';
import { format } from 'date-fns';

const routes = {
  getAuthor: {
    method: 'GET',
    route: '/authors/:author_id',
    handler: ({ AuthorService }, { params: { author_id } }, res) =>
      AuthorService.get({ authorId: author_id }).then(data => res.json(data)),
  },
  getAuthors: {
    method: 'GET',
    route: '/authors',
    handler: (
      { AuthorService },
      {
        query: {
          first,
          last,
          before,
          after,
          hasNextPage,
          hasPreviousPage,
          search,
        },
      },
      res
    ) =>
      AuthorService.getAll({
        first,
        last,
        before,
        after,
        hasNextPage,
        hasPreviousPage,
        search,
      }).then(data => res.json(data)),
  },
  getPoemsForAuthor: {
    method: 'GET',
    route: '/authors/:author_id/poems',
    handler: ({ AuthorService }, { params: { author_id } }, res) =>
      AuthorService.poems({ authorId: author_id }).then(data => res.json(data)),
  },
  getAuthorFromLibrary: {
    method: 'GET',
    route: '/library/authors/:author_id',
    auth: true,
    handler: (
      { AuthorService },
      { params: { author_id }, context: { user } },
      res
    ) =>
      AuthorService.getInfo({ userId: user.id, authorId: author_id }).then(
        data => res.json(data)
      ),
  },
  getRecentAuthors: {
    method: 'GET',
    route: 'recents/authors',
    auth: true,
    handler: (
      { AuthorService },
      {
        query: {
          first,
          last,
          before,
          after,
          hasNextPage,
          hasPreviousPage,
          search,
        },
        context: { user },
      },
      res
    ) =>
      AuthorService.getRecents({
        userId: user.id,
        first,
        last,
        before,
        after,
        hasNextPage,
        hasPreviousPage,
        search,
      }).then(data => res.json(data)),
  },
  getAuthorsFromLibrary: {
    method: 'GET',
    route: '/library/authors',
    auth: true,
    handler: (
      { AuthorService },
      {
        query: {
          first,
          last,
          before,
          after,
          hasNextPage,
          hasPreviousPage,
          search,
        },
        context: { user },
      },
      res
    ) =>
      AuthorService.getLibrary({
        userId: user.id,
        first,
        last,
        before,
        after,
        hasNextPage,
        hasPreviousPage,
        search,
      }).then(data => res.json(data)),
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
