import gql from 'graphql-tag';
import { AuthorFragment } from '@@graphql/fragments';

export default gql`
  query AuthorLibrary(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    authorList: authorLibrary(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "authorLibrary", filter: ["search"]) {
      edges {
        node {
          ...Author
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }

  ${AuthorFragment}
`;
