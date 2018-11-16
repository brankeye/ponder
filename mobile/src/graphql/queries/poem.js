import gql from 'graphql-tag';
import { PoemFragment } from '@@graphql/fragments';

export default gql`
  query Poem($id: ID!) {
    poem(id: $id) {
      ...Poem
    }
  }

  ${PoemFragment}
`;
