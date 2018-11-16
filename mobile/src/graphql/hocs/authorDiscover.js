import { graphql } from 'react-apollo';
import query from '../queries/authorDiscover';

export default graphql(query, {
  alias: 'withAuthorDiscover',
  name: 'authorDiscover',
  options: {
    partialRefetch: true,
  },
});
