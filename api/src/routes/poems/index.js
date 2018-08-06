import { merge } from 'ramda';
import { Poem, PoemInfo } from 'database';
import { format } from 'date-fns';

const routes = {
  getPoem: {
    method: 'GET',
    route: '/poems/:poem_id',
    handler: ({ PoemService }, { params: { poem_id } }, res) =>
      PoemService.get({ id: poem_id }).then(data => res.json(data)),
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
    handler: async (_, { body, context: { user } }, res) => {
      const user_id = user.id;
      const poemLib = await PoemInfo.query().findById([user_id, body.poem_id]);

      if (poemLib) {
        const poemInfo = await PoemInfo.query().patchAndFetchById(
          [user_id, body.poem_id],
          merge(
            { user_id, viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss') },
            body
          )
        );
        /*
        const poemInfosForAuthor = await Author.getPoemInfos({
          id: poemInfo.author_id,
        });
        
        if (poemInfosForAuthor.length > 0) {
          
        } else {

        }
        */
        res.json(poemInfo);
      } else {
        const poemWithAuthor = await Poem.query()
          .eager('author')
          .findById(body.poem_id);
        const poemInfo = await PoemInfo.query().insert(
          merge(
            {
              user_id,
              author_id: poemWithAuthor.author.id,
              viewed_at: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
            },
            body
          )
        );
        res.json(poemInfo);
      }
    },
  },
};

export default routes;
