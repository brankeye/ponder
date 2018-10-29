const routes = [
  {
    method: 'GET',
    route: '/authors/discover',
    handler: ({ AuthorService }, req, res) =>
      AuthorService.discover().then(data => res.json(data)),
  },
  {
    method: 'GET',
    route: '/authors/library',
    auth: true,
    handler: (
      { AuthorService },
      { query: { first, last, before, after, search }, context: { user } },
      res
    ) =>
      AuthorService.getLibrary({
        userId: user.id,
        first,
        last,
        before,
        after,
        search,
      }).then(data => res.json(data)),
  },
  {
    method: 'PUT',
    route: '/authors/library',
    auth: true,
    handler: ({ AuthorService }, { body, context: { user } }, res) =>
      AuthorService.updateLibrary({
        userId: user.id,
        authorId: body.author_id,
        inLibrary: body.in_library,
      }).then(data => res.json(data)),
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
      }).then(data => res.json(data)),
  },
  {
    method: 'GET',
    route: '/authors/:author_id',
    handler: ({ AuthorService }, { params: { author_id } }, res) =>
      AuthorService.getAuthor(author_id).then(data => res.json(data)),
  },
  {
    method: 'GET',
    route: '/authors/:author_id/poems',
    handler: ({ AuthorService }, { params: { author_id } }, res) =>
      AuthorService.getPoems({ authorId: author_id }).then(data =>
        res.json(data)
      ),
  },
  {
    method: 'GET',
    route: '/authors/:author_id/info',
    auth: true,
    handler: (
      { AuthorService },
      { params: { author_id }, context: { user } },
      res
    ) => AuthorService.getInfo(user.id, author_id).then(data => res.json(data)),
  },
  {
    method: 'PUT',
    route: '/authors/:author_id/view',
    auth: true,
    handler: (
      { AuthorService },
      { params: { author_id }, context: { user } },
      res
    ) =>
      AuthorService.updateView({
        userId: user.id,
        authorId: author_id,
      }).then(data => res.json(data)),
  },
];

export default routes;
