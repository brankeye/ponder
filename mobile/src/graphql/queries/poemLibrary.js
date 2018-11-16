import gql from 'graphql-tag';
import { PoemFragment } from '@@graphql/fragments';

export default gql`
  query PoemLibrary(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    poemList: poemLibrary(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "poemLibrary", filter: ["search"]) {
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
