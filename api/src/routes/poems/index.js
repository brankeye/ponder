const routes = [
  {
    method: 'GET',
    route: '/poems/discover',
    handler: ({ PoemService }, req, res) =>
      PoemService.discover().then(data => res.json(data)),
  },
  {
    method: 'GET',
    route: '/poems/library',
    auth: true,
    handler: (
      { PoemService },
      { query: { first, last, before, after, search }, context: { user } },
      res
    ) =>
      PoemService.getLibrary({
        userId: user.id,
        first,
        last,
        after,
        before,
        search,
      }).then(data => res.json(data)),
  },
  {
    method: 'GET',
    route: '/poems/recents',
    auth: true,
    handler: (
      { PoemService },
      { query: { first, last, before, after, search }, context: { user } },
      res
    ) =>
      PoemService.getRecents({
        userId: user.id,
        first,
        last,
        after,
        before,
        search,
      }).then(data => res.json(data)),
  },
  {
    method: 'GET',
    route: '/poems/:poem_id/info',
    auth: true,
    handler: (
      { PoemService },
      { params: { poem_id }, context: { user } },
      res
    ) => PoemService.getInfo(user.id, poem_id).then(data => res.json(data)),
  },
  {
    method: 'GET',
    route: '/poems/:poem_id',
    handler: ({ PoemService }, { params: { poem_id } }, res) =>
      PoemService.getPoem(poem_id).then(data => res.json(data)),
  },
  {
    method: 'PUT',
    route: '/poems/:poem_id/library',
    auth: true,
    handler: (
      { PoemService },
      { params: { poem_id }, body: { in_library }, context: { user } },
      res
    ) =>
      PoemService.updateLibrary({
        userId: user.id,
        poemId: poem_id,
        inLibrary: in_library,
      }).then(data => res.json(data)),
  },
  {
    method: 'PUT',
    route: '/poems/:poem_id/view',
    auth: true,
    handler: (
      { PoemService },
      { params: { poem_id }, context: { user } },
      res
    ) =>
      PoemService.updateView({
        userId: user.id,
        poemId: poem_id,
      }).then(data => res.json(data)),
  },
];

export default routes;
