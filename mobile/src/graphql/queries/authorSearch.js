import gql from 'graphql-tag';
import { AuthorFragment } from '@@graphql/fragments';

export default gql`
  query AuthorSearch(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    authorList: authorSearch(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "authorSearch", filter: ["search"]) {
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
