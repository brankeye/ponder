const routes = [
  {
    method: 'GET',
    route: '/authors/discover',
    handler: ({ AuthorService }) => AuthorService.discover(),
  },
  {
    method: 'GET',
    route: '/authors/library',
    auth: true,
    handler: (
      { AuthorService },
      { query: { first, last, before, after, search }, context: { user } }
    ) =>
      AuthorService.getLibrary({
        userId: user.id,
        first,
        last,
        before,
        after,
        search,
      }),
  },
  {
    method: 'PUT',
    route: '/authors/library',
    auth: true,
    handler: ({ AuthorService }, { body, context: { user } }) =>
      AuthorService.updateLibrary({
        userId: user.id,
        authorId: body.author_id,
        inLibrary: body.in_library,
      }),
  },
  {
    method: 'GET',
    route: 'authors/recents',
    auth: true,
    handler: (
      { AuthorService },
      { query: { first, last, before, after, search }, context: { user } },
      res
    ) =>
      AuthorService.getRecents({
        userId: user.id,
        first,
        last,
        before,
        after,
        search,
      }),
  },
  {
    method: 'GET',
    route: '/authors/:author_id',
    handler: ({ AuthorService }, { params: { author_id } }) =>
      AuthorService.getAuthor(author_id),
  },
  {
    method: 'GET',
    route: '/authors/:author_id/poems',
    handler: ({ AuthorService }, { params: { author_id } }) =>
      AuthorService.getPoems({ authorId: author_id }),
  },
  {
    method: 'GET',
    route: '/authors/:author_id/info',
    auth: true,
    handler: (
      { AuthorService },
      { params: { author_id }, context: { user } }
    ) => AuthorService.getInfo(user.id, author_id),
  },
  {
    method: 'PUT',
    route: '/authors/:author_id/view',
    auth: true,
    handler: (
      { AuthorService },
      { params: { author_id }, context: { user } }
    ) =>
      AuthorService.updateView({
        userId: user.id,
        authorId: author_id,
      }),
  },
];

export default routes;
