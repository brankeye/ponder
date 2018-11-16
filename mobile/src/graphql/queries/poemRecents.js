import gql from 'graphql-tag';
import { PoemFragment } from '@@graphql/fragments';

export default gql`
  query PoemRecents(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    poemList: poemRecents(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "poemRecents", filter: ["search"]) {
      edges {
        node {
          ...Poem
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${PoemFragment}
`;
