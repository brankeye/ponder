const routes = {
  getPoem: {
    method: 'GET',
    route: '/poems/:poem_id',
    handler: ({ PoemService }, { params: { poem_id } }, res) =>
      PoemService.get({ poemId: poem_id }).then(data => res.json(data)),
  },
  getPoems: {
    method: 'GET',
    route: '/poems',
    handler: (
      { PoemService },
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
      PoemService.getAll({
        first,
        last,
        after,
        before,
        hasNextPage,
        hasPreviousPage,
        search,
      }).then(data => res.json(data)),
  },
  getPoemFromLibrary: {
    method: 'GET',
    route: '/library/poems/:poem_id',
    auth: true,
    handler: (
      { PoemService },
      { params: { poem_id }, context: { user } },
      res
    ) =>
      PoemService.getInfo({ userId: user.id, poemId: poem_id }).then(data =>
        res.json(data)
      ),
  },
  getPoemsFromLibrary: {
    method: 'GET',
    route: '/library/poems',
    auth: true,
    handler: (
      { PoemService },
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
      PoemService.getLibrary({
        userId: user.id,
        first,
        last,
        after,
        before,
        hasNextPage,
        hasPreviousPage,
        search,
      }).then(data => res.json(data)),
  },
  getRecentPoems: {
    method: 'GET',
    route: 'recents/poems',
    auth: true,
    handler: (
      { PoemService },
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
      PoemService.getRecents({
        userId: user.id,
        first,
        last,
        after,
        before,
        hasNextPage,
        hasPreviousPage,
        search,
      }).then(data => res.json(data)),
  },
  updatePoemFromLibrary: {
    method: 'PUT',
    route: '/library/poems',
    auth: true,
    handler: ({ PoemService }, { body, context: { user } }, res) =>
      PoemService.updateLibrary({
        userId: user.id,
        poemId: body.poem_id,
        inLibrary: body.in_library,
      }).then(data => res.json(data)),
  },
};

export default routes;
