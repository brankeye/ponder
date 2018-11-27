import { graphql } from 'react-apollo';
import mutation from '../mutations/poemUpdateLibrary';
import poemLibraryQuery from '../queries/poemLibrary';
import { Buffer } from 'buffer';

export default graphql(mutation, {
  alias: 'withPoemLibraryMutation',
  props: ({ mutate }) => ({
    updateLibrary: poem =>
      mutate({
        variables: { id: poem.id, inLibrary: poem.inLibrary },
        optimisticResponse: {
          __typename: 'Mutation',
          poem,
        },
        update: (store, { data: { poem } }) => {
          try {
            const data = store.readQuery({ query: poemLibraryQuery });
            const startCursor = Buffer.from(poem.inLibraryAt).toString(
              'base64'
            );
            const nextPoem = {
              __typename: 'PoemEdge',
              node: poem,
              cursor: startCursor,
            };
            data.poemList.edges.unshift(nextPoem);
            data.poemList.pageInfo.startCursor = startCursor;
            store.writeQuery({ query: poemLibraryQuery, data });
          } catch (error) {
            console.log('Error: ', error);
          }
        },
      }),
    partialRefetch: true,
  }),
});
