import { prop, propOr } from 'ramda';

const resolver = {
  Query: {
    poem: (root, args, { Poem }) => Poem.get(args),
    poemList: (root, { from, ...args }, { Poem }) => {
      switch (from) {
        case 'Default':
          return Poem.getAll(args);
        case 'Recents':
          return Poem.getRecents(args);
        case 'Library':
          return Poem.getLibrary(args);
      }
    },
  },
  Mutation: {
    poemUpsert: (root, args, { Poem }) => Poem.upsertInfo(args),
  },
  PoemContract: {
    __resolveType: ({ author }) => (author ? 'Poem' : 'PoemDetails'),
    teaser: ({ lines }) => lines.slice(0, 4),
    inLibrary: async ({ in_library, id }, args, { Poem }) =>
      in_library || propOr(false, 'in_library', await Poem.getInfo({ id })),
    viewedAt: async ({ viewed_at, id }, args, { Poem }) =>
      viewed_at || propOr(null, 'viewed_at', await Poem.getInfo({ id })),
  },
  Poem: {
    author: ({ author_id }, args, { Author }) => Author.get({ id: author_id }),
  },
  PoemInfo: {
    id: prop('poem_id'),
    inLibrary: prop('in_library'),
    viewedAt: prop('viewed_at'),
  },
};

export default resolver;
