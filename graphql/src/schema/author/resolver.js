import { propOr } from 'ramda';

const resolver = {
  Query: {
    author: (root, { id }, { Author }) => Author.getAuthor(id),
    authorDiscover: (root, args, { Author }) => Author.discover(),
    authorLibrary: (root, args, { Author }) => Author.getLibrary(args),
    authorRecents: (root, args, { Author }) => Author.getRecents(args),
  },
  Mutation: {
    authorView: async (root, { id }, { Author }) => {
      await Author.view(id);
      return Author.getAuthor(id);
    },
  },
  Author: {
    inLibrary: async ({ in_library, id }, args, { Author }) =>
      in_library || propOr(false, 'in_library', await Author.getInfo(id)),
    inLibraryAt: async ({ in_library, id }, args, { Poem }) =>
      in_library || propOr(false, 'in_library_at', await Poem.getInfo(id)),
    viewedAt: async ({ viewed_at, id }, args, { Author }) =>
      viewed_at || propOr(null, 'viewed_at', await Author.getInfo(id)),
    poems: ({ id }, args, { Author }) => Author.getPoems(id),
  },
};

export default resolver;
