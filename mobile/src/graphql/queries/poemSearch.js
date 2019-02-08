import gql from 'graphql-tag';
import { PoemFragment } from '@@graphql/fragments';

export default gql`
  query PoemSearch(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    poemList: poemSearch(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "poemSearch", filter: ["search"]) {
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
