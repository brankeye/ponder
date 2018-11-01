import { authorizationFilter } from '../middleware';

const sendJson = res => data => res.json(data);

export default {
  before: [authorizationFilter],
  routes: [
    {
      method: 'GET',
      route: '/api/authors/discover',
      handler: (req, res, { AuthorService }) =>
        AuthorService.discover().then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/authors/library',
      handler: (
        { query: { first, last, before, after, search } },
        res,
        { AuthorService, user }
      ) =>
        AuthorService.getLibrary({
          userId: user.id,
          first,
          last,
          before,
          after,
          search,
        }).then(sendJson(res)),
    },
    {
      method: 'PUT',
      route: '/api/authors/library',
      handler: ({ body }, res, { AuthorService, user }) =>
        AuthorService.updateLibrary({
          userId: user.id,
          authorId: body.author_id,
          inLibrary: body.in_library,
        }).then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/authors/recents',
      handler: (
        { query: { first, last, before, after, search } },
        res,
        { AuthorService, user }
      ) =>
        AuthorService.getRecents({
          userId: user.id,
          first,
          last,
          before,
          after,
          search,
        }).then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/authors/:author_id',
      handler: ({ params: { author_id } }, res, { AuthorService }) =>
        AuthorService.getAuthor(author_id).then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/authors/:author_id/poems',
      handler: ({ params: { author_id } }, res, { AuthorService }) =>
        AuthorService.getPoems(author_id).then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/authors/:author_id/info',
      handler: ({ params: { author_id } }, res, { AuthorService, user }) =>
        AuthorService.getInfo(user.id, author_id).then(sendJson(res)),
    },
    {
      method: 'PUT',
      route: '/api/authors/:author_id/view',
      handler: ({ params: { author_id } }, res, { AuthorService, user }) =>
        AuthorService.updateView({
          userId: user.id,
          authorId: author_id,
        }).then(sendJson(res)),
    },
  ],
};
