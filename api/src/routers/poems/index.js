export default {
  create: ({ PoemService }) => ({
    discover: (req, res) => PoemService.discover().then(data => res.json(data)),

    search: ({ query: { first, last, before, after, search } }, res) =>
      PoemService.search({
        first,
        last,
        before,
        after,
        search,
      }).then(data => res.json(data)),

    library: (
      { state: { user }, query: { first, last, before, after, search } },
      res
    ) =>
      PoemService.library({
        userId: user.id,
        first,
        last,
        after,
        before,
        search,
      }).then(data => res.json(data)),

    recents: (
      { state: { user }, query: { first, last, before, after, search } },
      res
    ) =>
      PoemService.recents({
        userId: user.id,
        first,
        last,
        after,
        before,
        search,
      }).then(data => res.json(data)),

    info: ({ state: { user }, params: { poem_id } }, res) =>
      PoemService.info(user.id, poem_id).then(data => res.json(data)),

    get: ({ params: { poem_id } }, res) =>
      PoemService.get(poem_id).then(data => res.json(data)),

    updateLibrary: (
      { state: { user }, params: { poem_id }, body: { in_library } },
      res
    ) =>
      PoemService.updateLibrary(user.id, poem_id, in_library).then(data =>
        res.json(data)
      ),

    updateView: ({ state: { user }, params: { poem_id } }, res) =>
      PoemService.updateView(user.id, poem_id).then(data => res.json(data)),
  }),
};
