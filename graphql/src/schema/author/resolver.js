import { propOr } from 'ramda';

const resolver = {
  Query: {
    author: (root, args, { Author }) => Author.get(args),
    authorList: (root, args, { Author }) => Author.getAll(args),
  },
  PageInfo: {
    hasNextPage: connection => connection.hasNextPage(),
    hasPreviousPage: connection => connection.hasPreviousPage(),
  },
  AuthorContract: {
    __resolveType: ({ poems }) => (poems ? 'Author' : 'AuthorDetails'),
    inLibrary: async ({ in_library, id }, args, { Author }) =>
      in_library ||
      propOr(false, 'in_library', await Author.getLibrary({ id })),
  },
  Author: {
    poems: ({ id }, args, { Author }) => Author.getPoems({ id }),
  },
};

export default resolver;
