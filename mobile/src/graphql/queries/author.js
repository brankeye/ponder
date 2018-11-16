import gql from 'graphql-tag';
import { AuthorFragment } from '@@graphql/fragments';

export default gql`
  query Author($id: ID!) {
    author(id: $id) {
      ...Author
    }
  }

  ${AuthorFragment}
`;
