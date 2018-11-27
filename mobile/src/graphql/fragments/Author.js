export default `
  fragment Author on Author {
    id
    name
    inLibrary
    inLibraryAt
    viewedAt
    poems {
      id
      title
      teaser
      lines
      inLibrary
      inLibraryAt
      viewedAt
    }
  }
`;
