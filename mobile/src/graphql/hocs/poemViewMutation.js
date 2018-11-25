import { graphql } from 'react-apollo';
import mutation from '../mutations/poemUpdateView';
import poemRecentsQuery from '../queries/poemRecents';

export default graphql(mutation, {
  alias: 'withPoemViewMutation',
  props: ({ mutate }) => ({
    updateView: id =>
      mutate({
        variables: { id },
      }),
    partialRefetch: true,
  }),
  options: {
    refetchQueries: [
      {
        query: poemRecentsQuery,
        variables: { first: 5 },
      },
    ],
  },
});
