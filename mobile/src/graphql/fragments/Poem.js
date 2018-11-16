import gql from 'graphql-tag';

export default gql`
  fragment Poem on Poem {
    id
    title
    teaser
    lines
    inLibrary
    viewedAt
    author {
      id
      name
      inLibrary
      viewedAt
    }
  }
`;
