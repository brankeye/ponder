import gql from 'graphql-tag';
import { AuthorFragment } from '@@graphql/fragments';

export default gql`
  query AuthorDiscover {
    author: authorDiscover {
      ...Author
    }
  }

  ${AuthorFragment}
`;
