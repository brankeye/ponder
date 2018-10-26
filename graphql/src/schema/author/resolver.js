import { propOr } from 'ramda';

const resolver = {
  Query: {
    author: (root, args, { Author }) => Author.get(args),
    authorList: (root, { from, ...args }, { Author }) => {
      switch (from) {
        case 'Default':
          return Author.getAll(args);
        case 'Recents':
          return Author.getRecents(args);
        case 'Library':
          return Author.getLibrary(args);
      }
    },
  },
  Mutation: {
    authorView: (root, { id }, { Author }) => Author.view(id),
    authorBookmark: (root, { id, bookmarked }, { Author }) =>
      Author.bookmark(id, bookmarked),
  },
  AuthorContract: {
    __resolveType: ({ poems }) => (poems ? 'Author' : 'AuthorDetails'),
    inLibrary: async ({ in_library, id }, args, { Author }) =>
      in_library || propOr(false, 'in_library', await Author.getInfo({ id })),
    viewedAt: async ({ viewed_at, id }, args, { Author }) =>
      viewed_at || propOr(null, 'viewed_at', await Author.getInfo({ id })),
  },
  Author: {
    poems: ({ id }, args, { Author }) => Author.getPoems({ id }),
  },
};

export default resolver;
