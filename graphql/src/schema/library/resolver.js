import { prop } from 'ramda';

const resolver = {
  Query: {
    authorLibrary: (root, args, { Author }) => Author.getAllLibrary(args),
    poemLibrary: (root, args, { Poem }) => Poem.getAllLibrary(args),
  },
  Mutation: {
    authorLibraryUpsert: (root, args, { Author }) => Author.upsertLibrary(args),
    poemLibraryUpsert: (root, args, { Poem }) => Poem.upsertLibrary(args),
  },
  AuthorInfo: {
    id: prop('author_id'),
    inLibrary: prop('in_library'),
    viewedAt: prop('viewed_at'),
  },
  PoemInfo: {
    id: prop('poem_id'),
    inLibrary: prop('in_library'),
    viewedAt: prop('viewed_at'),
  },
};

export default resolver;
