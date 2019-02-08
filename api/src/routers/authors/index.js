export default {
  create: ({ AuthorService }) => ({
    discover: (req, res) =>
      AuthorService.discover().then(data => res.json(data)),

    search: ({ query: { first, last, before, after, search } }, res) =>
      AuthorService.search({
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
      AuthorService.library({
        userId: user.id,
        first,
        last,
        before,
        after,
        search,
      }).then(data => res.json(data)),

    recents: (
      { state: { user }, query: { first, last, before, after, search } },
      res
    ) =>
      AuthorService.recents({
        userId: user.id,
        first,
        last,
        before,
        after,
        search,
      }).then(data => res.json(data)),

    info: ({ state: { user }, params: { author_id } }, res) =>
      AuthorService.info(user.id, author_id).then(data => res.json(data)),

    get: ({ params: { author_id } }, res) =>
      AuthorService.get(author_id).then(data => res.json(data)),

    poems: ({ params: { author_id } }, res) =>
      AuthorService.poems(author_id).then(data => res.json(data)),

    updateView: ({ state: { user }, params: { author_id } }, res) =>
      AuthorService.updateView(user.id, author_id).then(data => res.json(data)),
  }),
};
