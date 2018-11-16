import { graphql } from 'react-apollo';
import query from '../queries/poemRecents';

export default graphql(query, {
  alias: 'withPoemRecents',
  name: 'poemRecents',
  options: ({ count, search }) => ({
    variables: {
      first: count,
      search,
    },
    partialRefetch: true,
  }),
});
