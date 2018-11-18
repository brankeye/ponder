import { graphql } from 'react-apollo';
import query from '../queries/authorDiscover';

export default graphql(query, {
  alias: 'withAuthorDiscoverQuery',
  name: 'authorDiscoverQuery',
  options: {
    partialRefetch: true,
  },
});
