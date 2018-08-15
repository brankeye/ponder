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
      { query: { first, last, before, after, search } },
      res
    ) =>
      AuthorService.getAll({
        first,
        last,
        before,
        after,
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
  getAuthorsFromLibrary: {
    method: 'GET',
    route: '/library/authors',
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
  updateAuthorFromLibrary: {
    method: 'PUT',
    route: '/library/authors',
    auth: true,
    handler: ({ AuthorService }, { body, context: { user } }, res) =>
      AuthorService.updateLibrary({
        userId: user.id,
        authorId: body.author_id,
        inLibrary: body.in_library,
      }).then(data => res.json(data)),
  },
};

export default routes;
