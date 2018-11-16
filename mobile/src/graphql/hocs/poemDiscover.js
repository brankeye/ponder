import { graphql } from 'react-apollo';
import query from '../queries/poemDiscover';

export default graphql(query, {
  alias: 'withPoemDiscover',
  name: 'poemDiscover',
  options: {
    partialRefetch: true,
  },
});
