import gql from 'graphql-tag';
import { PoemFragment } from '../fragments';

export default gql`
  mutation PoemUpdateView($id: ID!) {
    poem: poemView(id: $id) {
      ...Poem
    }
  }

  ${PoemFragment}
`;
