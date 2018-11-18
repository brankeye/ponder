import { graphql } from 'react-apollo';
import query from '../queries/author';

export default graphql(query, {
  alias: 'withAuthorQuery',
  name: 'authorQuery',
  options: id => ({
    variables: {
      id,
    },
    partialRefetch: true,
  }),
});
