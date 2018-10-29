import { propOr } from 'ramda';

const resolver = {
  Query: {
    poem: (root, { id }, { Poem }) => Poem.getPoem(id),
    poemDiscover: (root, args, { Poem }) => Poem.discover(),
    poemLibrary: (root, args, { Poem }) => Poem.getLibrary(args),
    poemRecents: (root, args, { Poem }) => Poem.getRecents(args),
  },
  Mutation: {
    poemView: (root, { id }, { Poem }) => Poem.view(id),
    poemLibrary: (root, { id, inLibrary }, { Poem }) =>
      Poem.library(id, inLibrary),
  },
  PoemContract: {
    __resolveType: ({ author }) => (author ? 'Poem' : 'PoemDetails'),
    teaser: ({ lines }) => lines.slice(0, 4),
    inLibrary: async ({ in_library, id }, args, { Poem }) =>
      in_library || propOr(false, 'in_library', await Poem.getInfo(id)),
    viewedAt: async ({ viewed_at, id }, args, { Poem }) =>
      viewed_at || propOr(null, 'viewed_at', await Poem.getInfo(id)),
  },
  Poem: {
    author: ({ author_id }, args, { Author }) => Author.getAuthor(author_id),
  },
};

export default resolver;
