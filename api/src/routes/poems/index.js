const routes = [
  {
    method: 'GET',
    route: '/poems/discover',
    handler: ({ PoemService }) => PoemService.discover(),
  },
  {
    method: 'GET',
    route: '/poems/library',
    auth: true,
    handler: (
      { PoemService },
      { query: { first, last, before, after, search }, context: { user } }
    ) =>
      PoemService.getLibrary({
        userId: user.id,
        first,
        last,
        after,
        before,
        search,
      }),
  },
  {
    method: 'GET',
    route: '/poems/recents',
    auth: true,
    handler: (
      { PoemService },
      { query: { first, last, before, after, search }, context: { user } }
    ) =>
      PoemService.getRecents({
        userId: user.id,
        first,
        last,
        after,
        before,
        search,
      }),
  },
  {
    method: 'GET',
    route: '/poems/:poem_id/info',
    auth: true,
    handler: ({ PoemService }, { params: { poem_id }, context: { user } }) =>
      PoemService.getInfo(user.id, poem_id),
  },
  {
    method: 'GET',
    route: '/poems/:poem_id',
    handler: ({ PoemService }, { params: { poem_id } }) =>
      PoemService.getPoem(poem_id),
  },
  {
    method: 'PUT',
    route: '/poems/:poem_id/library',
    auth: true,
    handler: (
      { PoemService },
      { params: { poem_id }, body: { in_library }, context: { user } }
    ) =>
      PoemService.updateLibrary({
        userId: user.id,
        poemId: poem_id,
        inLibrary: in_library,
      }),
  },
  {
    method: 'PUT',
    route: '/poems/:poem_id/view',
    auth: true,
    handler: ({ PoemService }, { params: { poem_id }, context: { user } }) =>
      PoemService.updateView({
        userId: user.id,
        poemId: poem_id,
      }),
  },
];

export default routes;
