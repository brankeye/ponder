import { graphql } from 'react-apollo';
import mutation from '../mutations/poemUpdateView';
import poemRecentsQuery from '../queries/poemRecents';
import { Buffer } from 'buffer';

export default graphql(mutation, {
  alias: 'withPoemViewMutation',
  props: ({ mutate }) => ({
    updateView: id =>
      mutate({
        variables: { id },
        update: (store, { data: { poem } }) => {
          try {
            const data = store.readQuery({ query: poemRecentsQuery });
            const startCursor = Buffer.from(poem.viewedAt).toString('base64');
            const nextPoem = {
              __typename: 'PoemEdge',
              node: poem,
              cursor: startCursor,
            };
            data.poemList.edges.unshift(nextPoem);
            data.poemList.pageInfo.startCursor = startCursor;
            store.writeQuery({ query: poemRecentsQuery, data });
          } catch (error) {
            console.log('Error: ', error);
          }
        },
      }),
    partialRefetch: true,
  }),
});
