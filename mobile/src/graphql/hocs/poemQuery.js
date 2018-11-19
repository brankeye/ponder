import { graphql } from 'react-apollo';
import query from '../queries/poem';

export default graphql(query, {
  alias: 'withPoemQuery',
  name: 'poemQuery',
  options: ({ id }) => ({
    variables: {
      id,
    },
    partialRefetch: true,
  }),
});
