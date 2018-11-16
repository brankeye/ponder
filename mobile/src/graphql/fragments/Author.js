import gql from 'graphql-tag';

export default gql`
  fragment Author on Author {
    id
    name
    inLibrary
    viewedAt
    poems {
      id
      title
      teaser
      lines
      inLibrary
      viewedAt
    }
  }
`;
