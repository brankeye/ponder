import { graphql } from 'react-apollo';
import mutation from '../mutations/poemUpdateLibrary';
import poemLibraryQuery from '../queries/poemLibrary';

export default graphql(mutation, {
  alias: 'withPoemLibraryMutation',
  props: ({ mutate }) => ({
    updateLibrary: (id, inLibrary) =>
      mutate({
        variables: { id, inLibrary },
      }),
    partialRefetch: true,
  }),
  options: {
    refetchQueries: [
      {
        query: poemLibraryQuery,
        variables: { first: 5 },
      },
    ],
  },
});
