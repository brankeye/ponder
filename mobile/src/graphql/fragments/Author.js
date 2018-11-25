export default `
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
