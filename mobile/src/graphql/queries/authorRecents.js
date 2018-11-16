import gql from 'graphql-tag';
import { AuthorFragment } from '@@graphql/fragments';

export default gql`
  query AuthorRecents(
    $search: String
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    authorList: authorRecents(
      search: $search
      first: $first
      after: $after
      last: $last
      before: $before
    ) @connection(key: "authorRecents", filter: ["search"]) {
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
