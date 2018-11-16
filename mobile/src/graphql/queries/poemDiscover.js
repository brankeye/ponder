import gql from 'graphql-tag';
import { PoemFragment } from '@@graphql/fragments';

export default gql`
  query PoemDiscover {
    poemDiscover {
      ...Poem
    }
  }

  ${PoemFragment}
`;
