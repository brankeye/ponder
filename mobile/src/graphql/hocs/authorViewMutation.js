import { graphql } from 'react-apollo';
import mutation from '../mutations/authorUpdateView';
import authorRecentsQuery from '../queries/authorRecents';
import { Buffer } from 'buffer';

export default graphql(mutation, {
  alias: 'withAuthorViewMutation',
  props: ({ mutate }) => ({
    updateView: id =>
      mutate({
        variables: { id },
        update: (store, { data: { author } }) => {
          try {
            const data = store.readQuery({ query: authorRecentsQuery });
            const startCursor = Buffer.from(author.viewedAt).toString('base64');
            const nextAuthor = {
              __typename: 'AuthorEdge',
              node: author,
              cursor: startCursor,
            };
            data.authorList.edges.unshift(nextAuthor);
            data.authorList.pageInfo.startCursor = startCursor;
            store.writeQuery({ query: authorRecentsQuery, data });
          } catch (error) {
            console.log('Error: ', error);
          }
        },
      }),
    partialRefetch: true,
  }),
});
