import { format } from 'date-fns';

export default {
  create: ({ Poem, PoemInfo, AuthorInfo }) => ({
    get: poemId => Poem.get(poemId),

    discover: () => Poem.getRandom(),

    info: async (userId, poemId) => {
      const info = await PoemInfo.get(userId, poemId);
      return (
        info || {
          user_id: userId,
          poem_id: poemId,
          in_library: false,
          viewed_at: null,
        }
      );
    },

    recents: ({ userId, first, last, after, before, search }) =>
      PoemInfo.getRecents({ userId, first, last, after, before, search }),

    library: ({ userId, first, last, after, before, search }) =>
      PoemInfo.getLibrary({ userId, first, last, after, before, search }),

    updateLibrary: async (userId, poemId, inLibrary) => {
      const author = await Poem.getAuthor(poemId);
      await AuthorInfo.upsert({
        userId,
        authorId: author.id,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
      return PoemInfo.upsert({
        userId,
        authorId: author.id,
        poemId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    },

    updateView: async (userId, poemId, inLibrary) => {
      const author = await Poem.getAuthor(poemId);
      await AuthorInfo.upsert({
        userId,
        authorId: author.id,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
      return PoemInfo.upsert({
        userId,
        authorId: author.id,
        poemId,
        inLibrary,
        viewedAt: format(new Date(), 'YYYY-MM-DDTHH:mm:ss'),
      });
    },
  }),
};
