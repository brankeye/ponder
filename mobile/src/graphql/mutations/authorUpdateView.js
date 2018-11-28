import gql from 'graphql-tag';
import { AuthorFragment } from '../fragments';

export default gql`
  mutation AuthorUpdateView($id: ID!) {
    author: authorView(id: $id) {
      ...Author
    }
  }

  ${AuthorFragment}
`;
