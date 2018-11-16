import gql from 'graphql-tag';
import { PoemFragment } from '../fragments';

export default gql`
  mutation PoemUpdateLibrary($id: ID!, $inLibrary: Boolean!) {
    poem: poemLibrary(id: $id, inLibrary: $inLibrary) {
      ...Poem
    }
  }

  ${PoemFragment}
`;
