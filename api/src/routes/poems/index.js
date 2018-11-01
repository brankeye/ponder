import { authorizationFilter } from '../middleware';

const sendJson = res => data => res.json(data);

export default {
  before: [authorizationFilter],
  routes: [
    {
      method: 'GET',
      route: '/api/poems/discover',
      handler: (req, res, { PoemService }) =>
        PoemService.discover().then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/poems/library',
      handler: (
        { query: { first, last, before, after, search } },
        res,
        { PoemService, user }
      ) =>
        PoemService.getLibrary({
          userId: user.id,
          first,
          last,
          after,
          before,
          search,
        }).then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/poems/recents',
      handler: (
        { query: { first, last, before, after, search } },
        res,
        { PoemService, user }
      ) =>
        PoemService.getRecents({
          userId: user.id,
          first,
          last,
          after,
          before,
          search,
        }).then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/poems/:poem_id/info',
      handler: ({ params: { poem_id } }, res, { PoemService, user }) =>
        PoemService.getInfo(user.id, poem_id).then(sendJson(res)),
    },
    {
      method: 'GET',
      route: '/api/poems/:poem_id',
      handler: ({ params: { poem_id } }, res, { PoemService }) =>
        PoemService.getPoem(poem_id).then(sendJson(res)),
    },
    {
      method: 'PUT',
      route: '/api/poems/:poem_id/library',
      handler: (
        { params: { poem_id }, body: { in_library } },
        res,
        { PoemService, user }
      ) =>
        PoemService.updateLibrary({
          userId: user.id,
          poemId: poem_id,
          inLibrary: in_library,
        }).then(sendJson(res)),
    },
    {
      method: 'PUT',
      route: '/api/poems/:poem_id/view',
      auth: true,
      handler: ({ params: { poem_id } }, res, { PoemService, user }) =>
        PoemService.updateView({
          userId: user.id,
          poemId: poem_id,
        }).then(sendJson(res)),
    },
  ],
};
