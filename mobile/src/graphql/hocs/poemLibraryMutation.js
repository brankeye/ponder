import { graphql } from 'react-apollo';
import mutation from '../mutations/poemUpdateLibrary';

export default graphql(mutation, {
  alias: 'withPoemLibraryMutation',
  name: 'poemLibraryMutation',
  options: ({ mutate }) => ({
    updateLibrary: (id, inLibrary) =>
      mutate({
        variables: { id, inLibrary },
      }),
    partialRefetch: true,
  }),
});
