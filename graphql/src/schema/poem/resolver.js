import { propOr } from 'ramda';

const resolver = {
  Query: {
    poem: (root, args, { Poem }) => Poem.get(args),
    poemList: (root, args, { Poem }) => Poem.getAll(args),
  },
  PoemContract: {
    __resolveType: ({ author }) => (author ? 'Poem' : 'PoemDetails'),
    teaser: ({ lines }) => lines.slice(0, 4),
    inLibrary: async ({ in_library, id }, args, { Poem }) =>
      in_library || propOr(false, 'in_library', await Poem.getLibrary({ id })),
  },
  Poem: {
    author: ({ author_id }, args, { Author }) => Author.get({ id: author_id }),
  },
};

export default resolver;
