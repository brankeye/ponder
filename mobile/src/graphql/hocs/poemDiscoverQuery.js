import { graphql } from 'react-apollo';
import query from '../queries/poemDiscover';

export default graphql(query, {
  alias: 'withPoemDiscoverQuery',
  name: 'poemDiscoverQuery',
  options: {
    partialRefetch: true,
  },
});
